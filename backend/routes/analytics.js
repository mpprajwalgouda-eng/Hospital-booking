const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getSummary, getReport } = require('../controllers/analyticsController');

router.get('/summary', protect, authorizeRoles('admin', 'doctor'), getSummary);
router.get('/reports', protect, authorizeRoles('admin'), getReport);

module.exports = router;
