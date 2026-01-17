const { connectDb } = require('../_lib/db');
const { readJsonBody, sendJson, methodNotAllowed } = require('../_lib/http');
const { tryGetAuth } = require('../_lib/auth');
const { makeCacheKey } = require('../_lib/aiCache');
const { systemInstruction, promptForInsight } = require('../_lib/aiPrompts');
const { generateText } = require('../_lib/gemini');

const AIInsight = require('../_models/AIInsight');
const ActivityLog = require('../_models/ActivityLog');
const Order = require('../_models/Order');
const Shipment = require('../_models/Shipment');

function fallbackText(type, context) {
  const ctx = context || {};
  if (type === 'eta_explain') {
    return 'ETA depends on traffic, route constraints, loading/unloading time, and driver rest breaks. If you share the tracking ID and last known location, I can explain likely delay drivers and what to monitor.';
  }
  if (type === 'shipment_recommendation') {
    return 'Recommendation: match vehicle capacity to cargo weight, add buffer for loading time, and schedule pickups earlier in the day to reduce congestion risk. Share origin, destination, and weight for a tighter plan.';
  }
  if (type === 'demand_forecast_summary') {
    return 'Demand summary: not enough historical orders in the database yet. Start capturing orders per day/week to detect seasonality; then staff and vehicle allocation can be adjusted proactively.';
  }
  if (type === 'manager_decision_intel') {
    return 'Manager intel: focus on delayed/maintenance vehicles first, rebalance capacity to hotspots, and proactively message customers on at-risk shipments. Add more tracking pings to improve accuracy.';
  }

  // customer_support default
  const msg = String(ctx.message || '').toLowerCase();
  if (msg.includes('track')) return 'You can track your shipment from the customer dashboard using your tracking ID. If you share the tracking ID, I can explain what the current status means.';
  if (msg.includes('price') || msg.includes('fare')) return 'Pricing depends on truck type and distance. If you share pickup, drop, and weight, I can estimate the fare and recommend a truck class.';
  return 'I can help with booking, tracking, pricing, and delay explanations. What’s your pickup location, drop location, and cargo weight?';
}

async function demandAggregates({ windowDays }) {
  const days = Number(windowDays) || 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const pipeline = [
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        revenue: { $sum: '$amount' }
      }
    },
    { $sort: { _id: 1 } }
  ];
  const perDay = await Order.aggregate(pipeline);
  const totals = perDay.reduce(
    (acc, d) => {
      acc.orders += d.orders;
      acc.revenue += d.revenue;
      return acc;
    },
    { orders: 0, revenue: 0 }
  );
  return { windowDays: days, perDay, totals };
}

async function managerKpis() {
  const shipmentsByStatus = await Shipment.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // For a demo dashboard, keep KPIs simple and robust.
  const shipmentsTotal = await Shipment.countDocuments({});
  const ordersLast7d = await Order.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });

  return {
    shipmentsTotal,
    shipmentsByStatus: shipmentsByStatus || [],
    ordersLast7d
  };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return methodNotAllowed(res, 'POST');

  const user = tryGetAuth(req);

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const { type, context } = body || {};
  const insightType = String(type || 'customer_support');

  // Attempt DB-backed caching; if DB not configured, still answer with fallbacks.
  let dbReady = true;
  try {
    await connectDb();
  } catch {
    dbReady = false;
  }

  const key = makeCacheKey({ type: insightType, context: context || {}, user });

  if (dbReady) {
    const cached = await AIInsight.findOne({ key, expiresAt: { $gt: new Date() } }).lean();
    if (cached) {
      return sendJson(res, 200, { ok: true, text: cached.outputText, cached: true });
    }
  }

  // Enrich context using MongoDB aggregations only when it adds value.
  const enrichedContext = { ...(context || {}) };
  if (dbReady && insightType === 'demand_forecast_summary') {
    enrichedContext.aggregates = await demandAggregates({ windowDays: enrichedContext.windowDays || 30 });
  }
  if (dbReady && insightType === 'manager_decision_intel') {
    enrichedContext.kpis = await managerKpis();
  }

  const system = systemInstruction();
  const prompt = promptForInsight(insightType, enrichedContext);

  let text;
  let usedGemini = false;
  try {
    text = await generateText({ system, prompt, model: 'gemini-1.5-flash' });
    usedGemini = true;
  } catch {
    text = fallbackText(insightType, enrichedContext);
  }

  if (dbReady) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    try {
      await AIInsight.updateOne(
        { key },
        {
          $setOnInsert: {
            key,
            type: insightType,
            model: 'gemini-1.5-flash',
            input: { type: insightType, context: enrichedContext, user: user ? { role: user.role, email: user.email } : null },
            outputText: text,
            cached: true,
            expiresAt
          }
        },
        { upsert: true }
      );

      await ActivityLog.create({
        actorUserId: user ? user.sub : null,
        actorRole: user ? user.role : 'guest',
        action: 'ai.insight',
        entityType: 'AIInsight',
        entityId: key,
        metadata: { type: insightType, usedGemini }
      });
    } catch {
      // Cache failures should never break the user flow.
    }
  }

  return sendJson(res, 200, { ok: true, text, cached: false, usedGemini });
};
