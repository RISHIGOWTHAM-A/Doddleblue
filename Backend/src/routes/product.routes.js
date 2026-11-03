const express = require('express');
const productController = require('../controllers/product.controller');
const reviewController = require('../controllers/review.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:productId/reviews', reviewController.listProductReviews);
router.post(
  '/:productId/reviews',
  authenticate,
  authorize('customer'),
  reviewController.createReview
);
router.get('/:id', productController.getProductById);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  productController.createProduct
);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  productController.updateProduct
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  productController.deleteProduct
);

module.exports = router;
