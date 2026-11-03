const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const ApiError = require('../utils/ApiError');
const cartService = require('./cart.service');
const { ORDER_STATUSES } = require('../models/order.model');

const DELIVERY_FEE = 50;
const FREE_DELIVERY_ABOVE = 500;

const runInTransaction = async (fn) => {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await fn(session);
    });
    return result;
  } catch (err) {
    if (/replica set|transactions? (are )?not supported|Transaction numbers/i.test(err.message)) {
      return fn(null);
    }
    throw err;
  } finally {
    await session.endSession();
  }
};

const decrementStock = async (product, weightOption, quantity, session) => {
  const opts = session ? { session } : undefined;
  let res;

  if (product.weightOptions.length > 0) {
    res = await Product.updateOne(
      {
        _id: product._id,
        weightOptions: {
          $elemMatch: { label: weightOption, stock: { $gte: quantity } },
        },
      },
      { $inc: { 'weightOptions.$.stock': -quantity } },
      opts
    );
  } else {
    res = await Product.updateOne(
      { _id: product._id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      opts
    );
  }

  if (res.modifiedCount === 0) {
    throw new ApiError(
      400,
      `Insufficient stock for "${product.name}"${weightOption ? ` (${weightOption})` : ''}`
    );
  }
};

const placeOrder = async (customerId, shippingAddress) =>
  runInTransaction(async (session) => {
    const opts = session ? { session } : undefined;
    const cart = await Cart.findOne({ customer: customerId }, null, opts);
    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, 'Your cart is empty');
    }

    const items = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product = await Product.findOne(
        { _id: item.product, isActive: true },
        null,
        opts
      );
      if (!product) {
        throw new ApiError(400, 'A product in your cart is no longer available');
      }

      const { price } = cartService.resolvePricing(product, item.weightOption);
      await decrementStock(product, item.weightOption, item.quantity, session);

      const lineTotal = price * item.quantity;
      subtotal += lineTotal;
      items.push({
        product: product._id,
        name: product.name,
        weightOption: item.weightOption,
        quantity: item.quantity,
        price,
        lineTotal,
      });
    }

    const deliveryFee = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const [order] = await Order.create(
      [
        {
          customer: customerId,
          items,
          shippingAddress,
          subtotal,
          deliveryFee,
          totalAmount: subtotal + deliveryFee,
          paymentMethod: 'cod',
        },
      ],
      opts
    );

    cart.items = [];
    await cart.save(opts);

    return order;
  });

const getMyOrders = (customerId, query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));
  return Promise.all([
    Order.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Order.countDocuments({ customer: customerId }),
  ]).then(([items, total]) => ({
    items,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  }));
};

const getMyOrder = async (orderId, customerId) => {
  const order = await Order.findOne({ _id: orderId, customer: customerId });
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};

const adminListOrders = async (query) => {
  const filter = {};
  if (query.status && ORDER_STATUSES.includes(query.status)) {
    filter.orderStatus = query.status;
  }

  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 20));

  const [items, total] = await Promise.all([
    Order.find(filter)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  return { items, page, totalPages: Math.ceil(total / limit), total };
};

const updateOrderStatus = async (orderId, status) => {
  if (!ORDER_STATUSES.includes(status)) {
    throw new ApiError(
      400,
      `Invalid status. Allowed: ${ORDER_STATUSES.join(', ')}`
    );
  }
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, 'Order not found');

  order.orderStatus = status;
  if (status === 'delivered') order.paymentStatus = 'paid';
  await order.save();
  return order;
};

module.exports = {
  placeOrder,
  getMyOrders,
  getMyOrder,
  adminListOrders,
  updateOrderStatus,
};
