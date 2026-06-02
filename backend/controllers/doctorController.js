const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Department = require('../models/Department');

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('user department');
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user department');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const { userId, specialty, departmentId, workingHours } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) return res.status(404).json({ message: 'User not found' });
    const department = await Department.findById(departmentId);
    const doctor = await Doctor.create({
      user: userId,
      specialty,
      department: department?._id,
      workingHours,
    });
    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user department');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    next(error);
  }
};
