const reviewService = require('../services/review.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isObjectId } = require('../utils/validators');

const createReview = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.productId)) {
    throw new ApiError(400, 'Invalid product id');
  }
  const review = await reviewService.createReview(
    req.user._id,
    req.params.productId,
    req.body
  );
  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    data: review,
  });
});

const listProductReviews = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.productId)) {
    throw new ApiError(400, 'Invalid product id');
  }
  const result = await reviewService.listProductReviews(
    req.params.productId,
    req.query
  );
  res.status(200).json({
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

module.exports = { createReview, listProductReviews };
