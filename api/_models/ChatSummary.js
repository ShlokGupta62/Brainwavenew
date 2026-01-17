const mongoose = require('mongoose');

const ChatSummarySchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, trim: true },
    user: {
      name: { type: String, default: 'Anonymous' },
      email: { type: String, default: 'N/A' },
      role: { type: String, default: 'guest' }
    },
    topics: { type: [String], default: [] },
    messageCount: { type: Number, default: 0 },
    summary: { type: String, default: '' },
    firstUserMessage: { type: String, default: '' },
    lastUserMessage: { type: String, default: '' },
    startedAt: { type: Date, default: null },
    endedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

ChatSummarySchema.index({ sessionId: 1, createdAt: -1 });
ChatSummarySchema.index({ 'user.email': 1, createdAt: -1 });

module.exports = mongoose.models.ChatSummary || mongoose.model('ChatSummary', ChatSummarySchema);
