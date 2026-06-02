const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalPatients: { type: Number, default: 0 },
  activeDoctors: { type: Number, default: 0 },
  activeQueues: { type: Number, default: 0 },
  averageWaitMinutes: { type: Number, default: 0 },
  emergencyCases: { type: Number, default: 0 },
  departmentAnalytics: [{ department: String, count: Number }],
});

module.exports = mongoose.model('Report', reportSchema);
