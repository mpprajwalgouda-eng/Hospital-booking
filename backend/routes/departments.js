const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const Department = require('../models/Department');

router.get('/', protect, async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
