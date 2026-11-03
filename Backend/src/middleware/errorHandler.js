const env = require('../config/env');

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value for ${field}`;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired, please log in again';
  }

  if (statusCode === 500 && env.nodeEnv !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { notFound, errorHandler };
