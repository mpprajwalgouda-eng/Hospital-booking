const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { createToken, getUserTokens, getQueue, updateTokenStatus, cancelToken } = require('../controllers/tokenController');

router.post('/', protect, authorizeRoles('patient', 'admin', 'doctor'), createToken);
router.get('/my-tokens', protect, authorizeRoles('patient'), getUserTokens);
router.get('/live', protect, getQueue);
router.put('/:id/status', protect, authorizeRoles('doctor', 'admin'), updateTokenStatus);
router.put('/:id/cancel', protect, authorizeRoles('patient', 'admin'), cancelToken);

module.exports = router;
