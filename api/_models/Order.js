const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    customerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
  },
  { timestamps: true }
);

OrderSchema.index({ customerUserId: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1, createdAt: -1 });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
