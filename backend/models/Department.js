const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  color: { type: String, default: '#06B6D4' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Department', departmentSchema);
