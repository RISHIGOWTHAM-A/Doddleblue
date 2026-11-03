const express = require('express');
const adminController = require('../controllers/admin.controller');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate, authorize('admin'));

router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.getUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/orders', orderController.adminListOrders);
router.put('/orders/:id/status', orderController.adminUpdateOrderStatus);

router.get('/stats', adminController.getStats);

module.exports = router;
