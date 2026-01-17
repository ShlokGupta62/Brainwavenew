const { connectDb } = require('../_lib/db');
const { readJsonBody, sendJson, methodNotAllowed } = require('../_lib/http');
const { requireAuth } = require('../_lib/auth');

const Shipment = require('../_models/Shipment');
const Order = require('../_models/Order');
const ActivityLog = require('../_models/ActivityLog');

function makeTrackingId() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LH-${Date.now().toString(36).toUpperCase()}-${rand}`;
}

function computePricing({ truckType, distanceKm }) {
  const base = truckType === 'LCV' ? 1500 : truckType === 'MCV' ? 3500 : 7000;
  const perKm = truckType === 'LCV' ? 18 : truckType === 'MCV' ? 28 : 40;
  const dist = Number.isFinite(distanceKm) ? distanceKm : 0;
  const distanceFare = dist * perKm;
  const tollTax = dist * 2.5;
  const subtotal = base + distanceFare + tollTax;
  const gst = subtotal * 0.18;
  const totalFare = subtotal + gst;
  return { baseFare: base, distanceFare, tollTax, gst, totalFare };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return methodNotAllowed(res, 'POST');
  const claims = requireAuth(req, res);
  if (!claims) return;

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const { origin, destination, truckType, weightKg, distanceKm } = body || {};
  if (!origin || !destination || !truckType || !weightKg) {
    return sendJson(res, 400, { ok: false, error: 'Missing shipment fields' });
  }

  try {
    await connectDb();

    const trackingId = makeTrackingId();
    const pricing = computePricing({ truckType: String(truckType), distanceKm: Number(distanceKm) });

    const shipment = await Shipment.create({
      trackingId,
      customerUserId: claims.sub,
      origin: String(origin),
      destination: String(destination),
      truckType: String(truckType),
      weightKg: Number(weightKg),
      distanceKm: Number.isFinite(Number(distanceKm)) ? Number(distanceKm) : null,
      status: 'confirmed',
      pricing
    });

    const order = await Order.create({
      customerUserId: claims.sub,
      shipmentId: shipment._id,
      amount: pricing.totalFare,
      currency: 'INR',
      paymentStatus: 'pending'
    });

    await ActivityLog.create({
      actorUserId: claims.sub,
      actorRole: claims.role,
      action: 'shipment.create',
      entityType: 'Shipment',
      entityId: String(shipment._id),
      metadata: { trackingId }
    });

    return sendJson(res, 200, {
      ok: true,
      shipment: {
        id: String(shipment._id),
        trackingId: shipment.trackingId,
        status: shipment.status,
        pricing: shipment.pricing
      },
      order: {
        id: String(order._id),
        paymentStatus: order.paymentStatus,
        amount: order.amount,
        currency: order.currency
      }
    });
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: 'Failed to create shipment' });
  }
};
