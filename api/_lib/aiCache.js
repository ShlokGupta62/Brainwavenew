const crypto = require('crypto');

function stableStringify(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

function makeCacheKey({ type, context, user }) {
  // Cache key is intentionally derived from *inputs* only.
  // This allows MongoDB to reduce repeated Gemini calls and cost.
  const base = {
    type,
    context,
    user: user ? { role: user.role, email: user.email } : null
  };
  const raw = stableStringify(base);
  return crypto.createHash('sha256').update(raw).digest('hex');
}

module.exports = { makeCacheKey };
