const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate, authorize('customer'));

router.post('/', orderController.placeOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id/track', orderController.trackMyOrder);
router.get('/:id', orderController.getMyOrder);

module.exports = router;
