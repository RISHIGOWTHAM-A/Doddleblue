const orderService = require('../services/order.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isObjectId, missingFields } = require('../utils/validators');

const ADDRESS_FIELDS = [
  'fullName',
  'phone',
  'street',
  'city',
  'state',
  'postalCode',
  'country',
];

const placeOrder = asyncHandler(async (req, res) => {
  const address = req.body.shippingAddress;
  if (!address || typeof address !== 'object') {
    throw new ApiError(400, 'shippingAddress is required');
  }
  const missing = missingFields(address, ADDRESS_FIELDS);
  if (missing.length) {
    throw new ApiError(
      400,
      `Missing shipping address fields: ${missing.join(', ')}`
    );
  }

  const order = await orderService.placeOrder(req.user._id, address);
  res.status(201).json({
    success: true,
    message: 'Order placed successfully (Cash on Delivery)',
    data: order,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getMyOrders(req.user._id, req.query);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getMyOrder = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) throw new ApiError(400, 'Invalid order id');
  const order = await orderService.getMyOrder(req.params.id, req.user._id);
  res.status(200).json({
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const trackMyOrder = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) throw new ApiError(400, 'Invalid order id');
  const order = await orderService.getMyOrder(req.params.id, req.user._id);
  res.status(200).json({
    success: true,
    message: 'Order tracking retrieved successfully',
    data: {
      orderId: order._id,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      placedAt: order.createdAt,
      lastUpdated: order.updatedAt,
    },
  });
});

const adminListOrders = asyncHandler(async (req, res) => {
  const result = await orderService.adminListOrders(req.query);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const adminUpdateOrderStatus = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) throw new ApiError(400, 'Invalid order id');
  if (!req.body.status) throw new ApiError(400, 'status is required');

  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );
  res.status(200).json({
    success: true,
    message: `Order status updated to ${order.orderStatus}`,
    data: order,
  });
});

module.exports = {
  placeOrder,
  getMyOrders,
  getMyOrder,
  trackMyOrder,
  adminListOrders,
  adminUpdateOrderStatus,
};
