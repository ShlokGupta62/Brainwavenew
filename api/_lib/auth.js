const { verifyToken } = require('./jwt');

function getBearerToken(req) {
  const header = req.headers && (req.headers.authorization || req.headers.Authorization);
  if (!header) return null;
  const value = String(header);
  const match = value.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function tryGetAuth(req) {
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

function requireAuth(req, res, { role } = {}) {
  const claims = tryGetAuth(req);
  if (!claims) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
    return null;
  }
  if (role && claims.role !== role) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Forbidden' }));
    return null;
  }
  return claims;
}

module.exports = { tryGetAuth, requireAuth };
