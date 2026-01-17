const { connectDb } = require('./_lib/db');
const { readJsonBody, sendJson, methodNotAllowed } = require('./_lib/http');
const { tryGetAuth } = require('./_lib/auth');

const ChatSummary = require('./_models/ChatSummary');
const ActivityLog = require('./_models/ActivityLog');

module.exports = async (req, res) => {
  const user = tryGetAuth(req);

  if (req.method === 'GET') {
    try {
      await connectDb();
      const limit = Math.min(50, Math.max(1, Number(req.query && req.query.limit) || 20));
      const items = await ChatSummary.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return sendJson(res, 200, { ok: true, items });
    } catch {
      return sendJson(res, 200, { ok: true, items: [] });
    }
  }

  if (req.method !== 'POST') return methodNotAllowed(res, 'GET, POST');

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const summary = body || {};
  if (!summary.sessionId) return sendJson(res, 400, { ok: false, error: 'Missing sessionId' });

  try {
    await connectDb();

    const doc = await ChatSummary.create({
      sessionId: String(summary.sessionId),
      user: summary.userInfo || summary.user || { name: 'Anonymous', email: 'N/A', role: 'guest' },
      topics: Array.isArray(summary.topics) ? summary.topics : [],
      messageCount: Number(summary.messageCount || 0),
      summary: String(summary.summary || ''),
      firstUserMessage: String(summary.firstUserMessage || ''),
      lastUserMessage: String(summary.lastUserMessage || ''),
      startedAt: summary.timestamp ? new Date(summary.timestamp) : null,
      endedAt: summary.endTime ? new Date(summary.endTime) : null
    });

    await ActivityLog.create({
      actorUserId: user ? user.sub : null,
      actorRole: user ? user.role : 'guest',
      action: 'chat.summary',
      entityType: 'ChatSummary',
      entityId: String(doc._id),
      metadata: { sessionId: doc.sessionId }
    });

    return sendJson(res, 200, { ok: true, id: String(doc._id) });
  } catch {
    return sendJson(res, 500, { ok: false, error: 'Failed to save chat summary' });
  }
};
