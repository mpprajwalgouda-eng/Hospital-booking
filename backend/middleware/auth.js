const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized: token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized: user not found' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized: invalid token' });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permission' });
    }
    next();
  };
}

module.exports = { protect, authorizeRoles };
