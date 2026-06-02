const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const Patient = require('../models/Patient');

router.get('/me', protect, authorizeRoles('patient'), async (req, res, next) => {
  try {
    const profile = await Patient.findOne({ user: req.user._id }).populate('user activeTokens completedTokens');
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.post('/record', protect, authorizeRoles('doctor', 'admin'), async (req, res, next) => {
  try {
    const { patientId, medicalHistory, emergencyContact } = req.body;
    const patient = await Patient.findOneAndUpdate(
      { user: patientId },
      { medicalHistory, emergencyContact },
      { upsert: true, new: true }
    );
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
