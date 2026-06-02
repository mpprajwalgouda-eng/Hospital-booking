const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  type: { type: String, enum: ['info', 'success', 'warning', 'danger'], default: 'info' },
  channel: { type: String, enum: ['email', 'sms', 'system'], default: 'system' },
  read: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
