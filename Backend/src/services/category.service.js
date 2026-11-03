const Category = require('../models/category.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const listCategories = () =>
  Category.find({ isActive: true }).sort({ name: 1 });

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};

const createCategory = (data) => Category.create(data);

const updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  const fields = ['name', 'slug', 'description', 'image', 'isActive'];
  for (const field of fields) {
    if (data[field] !== undefined) category[field] = data[field];
  }

  return category.save();
};

const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  const inUse = await Product.countDocuments({ category: id });
  if (inUse > 0) {
    throw new ApiError(
      400,
      `Category is used by ${inUse} product(s) and cannot be deleted`
    );
  }

  await category.deleteOne();
  return category;
};

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
