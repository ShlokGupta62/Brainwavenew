const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'driver', 'agent', 'manager', 'admin']
    },
    passwordHash: { type: String, required: true },
    license: { type: String, default: '' },
    truckAssigned: { type: String, default: '' },
    employeeId: { type: String, default: '' }
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1, createdAt: -1 });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
