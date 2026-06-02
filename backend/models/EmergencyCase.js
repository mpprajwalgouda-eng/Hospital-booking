const mongoose = require('mongoose');

const emergencyCaseSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  urgencyLevel: { type: String, enum: ['critical', 'high', 'medium'], default: 'high' },
  status: { type: String, enum: ['registered', 'inQueue', 'served', 'resolved'], default: 'registered' },
  reportedAt: { type: Date, default: Date.now },
  notes: String,
});

module.exports = mongoose.model('EmergencyCase', emergencyCaseSchema);
