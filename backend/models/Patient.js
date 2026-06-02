const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicalHistory: { type: [String], default: [] },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  activeTokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
  completedTokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', patientSchema);
