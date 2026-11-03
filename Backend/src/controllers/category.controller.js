const categoryService = require('../services/category.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isObjectId, missingFields } = require('../utils/validators');

const listCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.listCategories();
  res.status(200).json({
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid category id');
  }
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const missing = missingFields(req.body, ['name']);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid category id');
  }
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid category id');
  }
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
