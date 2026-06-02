const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

router.get('/', protect, getDoctors);
router.get('/:id', protect, getDoctorById);
router.post('/', protect, authorizeRoles('admin'), createDoctor);
router.put('/:id', protect, authorizeRoles('admin', 'doctor'), updateDoctor);
router.delete('/:id', protect, authorizeRoles('admin'), deleteDoctor);

module.exports = router;
