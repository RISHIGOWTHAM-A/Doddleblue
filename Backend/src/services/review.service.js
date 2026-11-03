const mongoose = require('mongoose');
const Review = require('../models/review.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const ApiError = require('../utils/ApiError');

const recalcProductRating = async (productId) => {
  const [agg] = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: null,
        avg: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  await Product.updateOne(
    { _id: productId },
    {
      ratingsAverage: agg ? Math.round(agg.avg * 10) / 10 : 0,
      ratingsCount: agg ? agg.count : 0,
    }
  );
};

const createReview = async (customerId, productId, { rating, comment }) => {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new ApiError(400, 'rating must be an integer between 1 and 5');
  }

  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) throw new ApiError(404, 'Product not found');

  const eligible = await Order.exists({
    customer: customerId,
    orderStatus: 'delivered',
    'items.product': productId,
  });
  if (!eligible) {
    throw new ApiError(
      403,
      'You can review this product only after it has been delivered to you'
    );
  }

  const existing = await Review.findOne({
    customer: customerId,
    product: productId,
  });
  if (existing) {
    throw new ApiError(409, 'You have already reviewed this product');
  }

  const review = await Review.create({
    customer: customerId,
    product: productId,
    rating,
    comment,
  });
  await recalcProductRating(productId);
  return review;
};

const listProductReviews = async (productId, query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));

  const [items, total] = await Promise.all([
    Review.find({ product: productId })
      .populate('customer', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Review.countDocuments({ product: productId }),
  ]);

  return { items, page, totalPages: Math.ceil(total / limit), total };
};

module.exports = { createReview, listProductReviews, recalcProductRating };
