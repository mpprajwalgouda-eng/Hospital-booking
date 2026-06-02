const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getAllUsers, getUserById, updateUserRole } = require('../controllers/userController');

router.use(protect, authorizeRoles('admin'));
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id/role', updateUserRole);

module.exports = router;
