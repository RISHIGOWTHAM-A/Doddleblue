const express = require('express');
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', categoryController.listCategories);
router.get('/:id', categoryController.getCategory);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  categoryController.createCategory
);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  categoryController.updateCategory
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  categoryController.deleteCategory
);

module.exports = router;
