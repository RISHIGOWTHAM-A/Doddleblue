const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Review = require('../models/review.model');
const ApiError = require('../utils/ApiError');
const { toInt } = require('../utils/validators');
const reviewService = require('./review.service');

const listUsers = async (query) => {
  const filter = {};
  if (query.role && ['admin', 'customer'].includes(query.role)) {
    filter.role = query.role;
  }

  const page = Math.max(1, toInt(query.page, 1));
  const limit = Math.min(100, Math.max(1, toInt(query.limit, 20)));

  const [items, total] = await Promise.all([
    User.find(filter)
      .select('name email role phone createdAt')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return { items, page, totalPages: Math.ceil(total / limit), total };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('name email role phone address createdAt');
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const deleteUser = async (id, requestingAdminId) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, 'User not found');
  if (user.role === 'admin') {
    throw new ApiError(400, 'Admin accounts cannot be deleted');
  }
  if (user._id.toString() === requestingAdminId.toString()) {
    throw new ApiError(400, 'You cannot delete your own account');
  }

  const reviews = await Review.find({ customer: id }).select('product');
  await Promise.all([
    Cart.deleteOne({ customer: id }),
    Review.deleteMany({ customer: id }),
    user.deleteOne(),
  ]);
  await Promise.all(
    reviews.map((r) => reviewService.recalcProductRating(r.product))
  );

  return user;
};

module.exports = { listUsers, getUserById, deleteUser };
