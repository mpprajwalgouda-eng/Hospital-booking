const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  slot: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
