const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  specialty: { type: String, default: '' },
  consultationFee: { type: Number, default: 0 },
  workingHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
  },
  leaveDates: [{ type: Date }],
  ratings: { type: Number, default: 4.8 },
  status: { type: String, enum: ['available', 'offline', 'busy'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', doctorSchema);
