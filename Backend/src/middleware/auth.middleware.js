const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');

const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header && header.startsWith('Bearer ')) {
    token = header.slice(7);
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) throw new ApiError(401, 'Authentication required');

  const payload = jwt.verify(token, env.jwtAccessSecret);
  const user = await User.findById(payload.id);
  if (!user) throw new ApiError(401, 'User no longer exists');

  req.user = user;
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};

module.exports = { authenticate, authorize };
