const Token = require('../models/Token');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

function padNumber(num, size = 3) {
  return String(num).padStart(size, '0');
}

exports.createToken = async (req, res, next) => {
  try {
    const { departmentId, doctorId, priority, slot } = req.body;
    const department = await Department.findById(departmentId);
    const doctor = await Doctor.findById(doctorId);
    if (!department || !doctor) return res.status(400).json({ message: 'Invalid department or doctor' });

    const count = await Token.countDocuments({ department: department._id, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
    const tokenNumber = `${department.name.slice(0, 2).toUpperCase()}-${padNumber(count + 1)}`;
    const estimatedWaitMinutes = priority === 'emergency' ? 5 : 20 + count * 7;

    const token = await Token.create({
      tokenNumber,
      department: department._id,
      doctor: doctor._id,
      patient: req.user._id,
      priority,
      estimatedWaitMinutes,
      date: slot || new Date(),
      status: priority === 'emergency' ? 'emergency' : 'waiting',
    });

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

exports.getUserTokens = async (req, res, next) => {
  try {
    const tokens = await Token.find({ patient: req.user._id })
      .populate({ path: 'doctor', populate: { path: 'user' } })
      .populate('department')
      .sort({ date: -1 });
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

exports.getQueue = async (req, res, next) => {
  try {
    const { departmentId, doctorId } = req.query;
    const filters = { status: { $in: ['waiting', 'called', 'emergency'] } };
    
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) {
        filters.doctor = doctor._id;
      } else {
        return res.json([]);
      }
    } else {
      if (departmentId) filters.department = departmentId;
      if (doctorId) filters.doctor = doctorId;
    }

    const queue = await Token.find(filters)
      .populate({ path: 'doctor', populate: { path: 'user' } })
      .populate('patient department')
      .sort({ priority: -1, assignedAt: 1 });
    res.json(queue);
  } catch (error) {
    next(error);
  }
};

exports.updateTokenStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: 'Token not found' });

    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || token.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this token' });
      }
    }

    token.status = status;
    if (status === 'completed') {
      token.completedAt = new Date();
    }
    await token.save();

    const populated = await Token.findById(token._id).populate('doctor patient department');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

exports.cancelToken = async (req, res, next) => {
  try {
    const token = await Token.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!token) return res.status(404).json({ message: 'Token not found' });
    res.json({ message: 'Token cancelled', token });
  } catch (error) {
    next(error);
  }
};
