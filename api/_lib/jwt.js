const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // No hardcoded secret: keep security sane for real deployments.
    // For demo, set JWT_SECRET in your environment.
    throw new Error('Missing JWT_SECRET');
  }
  return secret;
}

function signToken(user) {
  const secret = getJwtSecret();
  return jwt.sign(
    {
      sub: String(user._id),
      role: user.role,
      email: user.email,
      name: user.name
    },
    secret,
    { expiresIn: '7d' }
  );
}

function verifyToken(token) {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
