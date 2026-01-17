const mongoose = require('mongoose');

const AIInsightSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    model: { type: String, default: 'gemini-1.5-flash' },
    input: { type: Object, default: {} },
    outputText: { type: String, required: true },
    cached: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

AIInsightSchema.index({ key: 1 }, { unique: true });
AIInsightSchema.index({ type: 1, createdAt: -1 });
AIInsightSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.AIInsight || mongoose.model('AIInsight', AIInsightSchema);
