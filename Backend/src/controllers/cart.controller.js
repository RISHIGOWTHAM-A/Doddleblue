const cartService = require('../services/cart.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isObjectId, missingFields } = require('../utils/validators');

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getEnrichedCart(req.user._id);
  res.status(200).json({
    success: true,
    message: 'Cart retrieved successfully',
    data: cart,
  });
});

const addItem = asyncHandler(async (req, res) => {
  const missing = missingFields(req.body, ['productId', 'quantity']);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
  if (!isObjectId(req.body.productId)) {
    throw new ApiError(400, 'Invalid product id');
  }

  await cartService.addItem(req.user._id, req.body);
  const cart = await cartService.getEnrichedCart(req.user._id);
  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: cart,
  });
});

const updateItem = asyncHandler(async (req, res) => {
  const missing = missingFields(req.body, ['productId', 'quantity']);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
  if (!isObjectId(req.body.productId)) {
    throw new ApiError(400, 'Invalid product id');
  }

  await cartService.updateQuantity(req.user._id, req.body);
  const cart = await cartService.getEnrichedCart(req.user._id);
  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: cart,
  });
});

const removeItem = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.productId)) {
    throw new ApiError(400, 'Invalid product id');
  }

  await cartService.removeItem(req.user._id, {
    productId: req.params.productId,
    weightOption: req.query.weightOption,
  });
  const cart = await cartService.getEnrichedCart(req.user._id);
  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: cart,
  });
});

const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user._id);
  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: { items: [], subtotal: 0, total: 0 },
  });
});

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
