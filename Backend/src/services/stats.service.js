const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

const getDashboardStats = async () => {
  const [
    totalProducts,
    activeProducts,
    totalCustomers,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    revenueAgg,
    inventoryAgg,
    lowStock,
    outOfStock,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    User.countDocuments({ role: 'customer' }),
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: 'pending' }),
    Order.countDocuments({ orderStatus: 'delivered' }),
    Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, revenue: { $sum: '$totalAmount' } } },
    ]),
    Product.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: { $sum: '$stock' },
        },
      },
    ]),
    Product.find({ stock: { $gt: 0, $lte: 5 } }).select('name slug stock'),
    Product.countDocuments({ stock: 0 }),
  ]);

  return {
    products: {
      total: totalProducts,
      active: activeProducts,
      outOfStock,
    },
    customers: { total: totalCustomers },
    orders: {
      total: totalOrders,
      pending: pendingOrders,
      delivered: deliveredOrders,
      revenue: revenueAgg[0] ? revenueAgg[0].revenue : 0,
    },
    inventory: {
      totalUnitsInStock: inventoryAgg[0] ? inventoryAgg[0].totalUnits : 0,
      lowStockProducts: lowStock,
    },
  };
};

module.exports = { getDashboardStats };
