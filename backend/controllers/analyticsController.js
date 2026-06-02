const User = require('../models/User');
const Token = require('../models/Token');
const Doctor = require('../models/Doctor');
const EmergencyCase = require('../models/EmergencyCase');
const Report = require('../models/Report');

exports.getSummary = async (req, res, next) => {
  try {
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const today = await Token.countDocuments({
        doctor: doctor._id,
        date: { $gte: startOfDay }
      });
      const active = await Token.countDocuments({
        doctor: doctor._id,
        status: 'called'
      });
      const upcoming = await Token.countDocuments({
        doctor: doctor._id,
        status: { $in: ['waiting', 'emergency'] }
      });
      const completed = await Token.countDocuments({
        doctor: doctor._id,
        status: 'completed'
      });

      return res.json({ today, active, upcoming, completed });
    }

    const totalPatients = await User.countDocuments({ role: 'patient' });
    const activeDoctors = await User.countDocuments({ role: 'doctor' });
    const activeQueues = await Token.countDocuments({ status: { $in: ['waiting', 'called', 'emergency'] } });
    const emergencyCases = await EmergencyCase.countDocuments({ status: { $ne: 'resolved' } });
    const averageWaitData = await Token.aggregate([
      { $match: { estimatedWaitMinutes: { $gt: 0 } } },
      { $group: { _id: null, avgWait: { $avg: '$estimatedWaitMinutes' } } },
    ]);
    const averageWaitMinutes = averageWaitData[0]?.avgWait || 0;
    const departmentAnalytics = await Token.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ totalPatients, activeDoctors, activeQueues, emergencyCases, averageWaitMinutes, departmentAnalytics });
  } catch (error) {
    next(error);
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ date: -1 }).limit(12);
    res.json(reports);
  } catch (error) {
    next(error);
  }
};
