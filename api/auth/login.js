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

  const { email, password, role } = body || {};
  if (!email || !password || !role) {
    return sendJson(res, 400, { ok: false, error: 'Missing email/password/role' });
  }

  try {
    await connectDb();
    const user = await User.findOne({ email: String(email).toLowerCase(), role: String(role) });
    if (!user) return sendJson(res, 401, { ok: false, error: 'Invalid credentials' });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return sendJson(res, 401, { ok: false, error: 'Invalid credentials' });

    const token = signToken(user);
    await ActivityLog.create({
      actorUserId: user._id,
      actorRole: user.role,
      action: 'auth.login',
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
  } catch {
    return sendJson(res, 500, { ok: false, error: 'Login failed' });
  }
};
