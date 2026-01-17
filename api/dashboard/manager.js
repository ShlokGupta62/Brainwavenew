const { connectDb } = require('../_lib/db');
const { sendJson, methodNotAllowed } = require('../_lib/http');
const { requireAuth } = require('../_lib/auth');

const Shipment = require('../_models/Shipment');
const Order = require('../_models/Order');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return methodNotAllowed(res, 'GET');
  const claims = requireAuth(req, res, { role: 'manager' });
  if (!claims) return;

  try {
    await connectDb();

    const shipmentsByStatus = await Shipment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const revenueLast30d = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      { $group: { _id: null, revenue: { $sum: '$amount' }, orders: { $sum: 1 } } }
    ]);

    return sendJson(res, 200, {
      ok: true,
      shipmentsByStatus,
      revenueLast30d: revenueLast30d[0] || { revenue: 0, orders: 0 }
    });
  } catch {
    return sendJson(res, 500, { ok: false, error: 'Dashboard unavailable' });
  }
};
