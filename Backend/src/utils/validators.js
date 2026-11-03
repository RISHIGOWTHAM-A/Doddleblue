const mongoose = require('mongoose');

const isObjectId = (value) => mongoose.isValidObjectId(value);

const missingFields = (body, fields) =>
  fields.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === ''
  );

const isNonNegativeNumber = (v) =>
  typeof v === 'number' && !Number.isNaN(v) && v >= 0;

const toInt = (value, fallback) => {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? fallback : n;
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = {
  isObjectId,
  missingFields,
  isNonNegativeNumber,
  toInt,
  escapeRegex,
};
