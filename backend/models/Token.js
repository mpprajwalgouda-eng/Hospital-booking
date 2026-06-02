const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['waiting', 'called', 'completed', 'cancelled', 'emergency'], default: 'waiting' },
  priority: { type: String, enum: ['normal', 'emergency'], default: 'normal' },
  estimatedWaitMinutes: { type: Number, default: 0 },
  assignedAt: { type: Date, default: Date.now },
  completedAt: Date,
  notes: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Token', tokenSchema);
