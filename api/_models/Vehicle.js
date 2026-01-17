const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    licensePlate: { type: String, required: true, trim: true, uppercase: true },
    type: { type: String, enum: ['LCV', 'MCV', 'HCV'], required: true },
    capacityKg: { type: Number, required: true },
    status: { type: String, enum: ['active', 'idle', 'maintenance'], default: 'idle' },
    lastKnownLocation: { type: String, default: '' }
  },
  { timestamps: true }
);

VehicleSchema.index({ licensePlate: 1 }, { unique: true });
VehicleSchema.index({ status: 1, type: 1 });

module.exports = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
