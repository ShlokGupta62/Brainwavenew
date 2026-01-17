const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, trim: true },
    customerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    truckType: { type: String, enum: ['LCV', 'MCV', 'HCV'], required: true },
    weightKg: { type: Number, required: true },
    distanceKm: { type: Number, default: null },
    status: {
      type: String,
      enum: ['created', 'confirmed', 'in_transit', 'delayed', 'delivered', 'cancelled'],
      default: 'created'
    },
    eta: { type: Date, default: null },
    lastKnownLocation: { type: String, default: '' },
    pricing: {
      baseFare: { type: Number, default: 0 },
      distanceFare: { type: Number, default: 0 },
      tollTax: { type: Number, default: 0 },
      gst: { type: Number, default: 0 },
      totalFare: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

ShipmentSchema.index({ trackingId: 1 }, { unique: true });
ShipmentSchema.index({ customerUserId: 1, createdAt: -1 });
ShipmentSchema.index({ status: 1, updatedAt: -1 });

module.exports = mongoose.models.Shipment || mongoose.model('Shipment', ShipmentSchema);
