const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getNotifications, sendNotification, broadcastAnnouncement } = require('../controllers/notificationController');

router.get('/', protect, getNotifications);
router.post('/', protect, authorizeRoles('admin'), sendNotification);
router.post('/broadcast', protect, authorizeRoles('admin'), broadcastAnnouncement);

module.exports = router;
