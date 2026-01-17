function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  return sendJson(res, 404, { ok: false, error: 'Not found' });
}

function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed);
  return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
}

async function readJsonBody(req) {
  // Vercel may already parse body; keep compatible with both cases.
  if (req.body && typeof req.body === 'object') return req.body;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};

  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

module.exports = {
  sendJson,
  notFound,
  methodNotAllowed,
  readJsonBody
};
