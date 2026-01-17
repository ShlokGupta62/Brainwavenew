const bcrypt = require('bcryptjs');
const { connectDb } = require('../_lib/db');
const { readJsonBody, sendJson, methodNotAllowed } = require('../_lib/http');
const { signToken } = require('../_lib/jwt');

const User = require('../_models/User');
const ActivityLog = require('../_models/ActivityLog');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return methodNotAllowed(res, 'POST');

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const { name, email, phone, password, role } = body || {};
  if (!name || !email || !password || !role) {
    return sendJson(res, 400, { ok: false, error: 'Missing required fields' });
  }

  try {
    await connectDb();

    const existing = await User.findOne({ email: String(email).toLowerCase() }).lean();
    if (existing) return sendJson(res, 409, { ok: false, error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      name: String(name),
      email: String(email).toLowerCase(),
      phone: String(phone || ''),
      role: String(role),
      passwordHash
    });

    const token = signToken(user);
    await ActivityLog.create({
      actorUserId: user._id,
      actorRole: user.role,
      action: 'auth.signup',
      entityType: 'User',
      entityId: String(user._id),
      metadata: { email: user.email }
    });

    return sendJson(res, 200, {
      ok: true,
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: 'Signup failed' });
  }
};
