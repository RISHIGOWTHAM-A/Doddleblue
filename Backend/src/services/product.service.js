const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');
const { isObjectId, toInt, escapeRegex } = require('../utils/validators');

const SORTS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  name_asc: { name: 1 },
};

const listProducts = async (query) => {
  const filter = { isActive: true };

  if (query.search) {
    filter.name = { $regex: escapeRegex(query.search.trim()), $options: 'i' };
  }

  if (query.category) {
    let categoryId = query.category;
    if (!isObjectId(categoryId)) {
      const cat = await Category.findOne({
        slug: query.category.toString().toLowerCase(),
      }).select('_id');
      if (!cat) return { items: [], page: 1, totalPages: 0, total: 0 };
      categoryId = cat._id;
    }
    filter.category = categoryId;
  }

  if (query.featured === 'true') filter.isFeatured = true;

  const exprs = [];
  const effectivePrice = { $ifNull: ['$discountPrice', '$price'] };
  const min = Number(query.minPrice);
  const max = Number(query.maxPrice);
  if (query.minPrice !== undefined && !Number.isNaN(min)) {
    exprs.push({ $gte: [effectivePrice, min] });
  }
  if (query.maxPrice !== undefined && !Number.isNaN(max)) {
    exprs.push({ $lte: [effectivePrice, max] });
  }
  if (exprs.length) filter.$expr = exprs.length === 1 ? exprs[0] : { $and: exprs };

  const sort = SORTS[query.sort] || SORTS.newest;
  const page = Math.max(1, toInt(query.page, 1));
  const limit = Math.min(50, Math.max(1, toInt(query.limit, 12)));

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return { items, page, totalPages: Math.ceil(total / limit), total };
};

const getFeaturedProducts = (query) =>
  listProducts({ ...query, featured: 'true' });

const getActiveProductById = async (id) => {
  const product = await Product.findOne({ _id: id, isActive: true }).populate(
    'category',
    'name slug'
  );
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    slug: slug.toLowerCase(),
    isActive: true,
  }).populate('category', 'name slug');
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const findProductForAdmin = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const createProduct = async (data) => {
  const category = await Category.findById(data.category);
  if (!category) throw new ApiError(400, 'Category does not exist');
  return Product.create(data);
};

const updateProduct = async (id, data) => {
  const product = await findProductForAdmin(id);

  if (data.category !== undefined) {
    const category = await Category.findById(data.category);
    if (!category) throw new ApiError(400, 'Category does not exist');
  }

  const fields = [
    'name',
    'slug',
    'description',
    'price',
    'discountPrice',
    'category',
    'images',
    'weightOptions',
    'stock',
    'ingredients',
    'allergens',
    'isFeatured',
    'isActive',
  ];
  for (const field of fields) {
    if (data[field] !== undefined) product[field] = data[field];
  }

  if (data.name && data.slug === undefined) {
    product.slug = undefined;
  }

  return product.save();
};

const deleteProduct = async (id) => {
  const product = await findProductForAdmin(id);
  await product.deleteOne();
  return product;
};

module.exports = {
  listProducts,
  getFeaturedProducts,
  getActiveProductById,
  getProductBySlug,
  findProductForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
};
