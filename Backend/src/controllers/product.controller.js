const productService = require('../services/product.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const {
  isObjectId,
  missingFields,
  isNonNegativeNumber,
} = require('../utils/validators');

const validateProductBody = (body, isUpdate = false) => {
  if (!isUpdate) {
    const missing = missingFields(body, [
      'name',
      'description',
      'price',
      'category',
    ]);
    if (missing.length) {
      throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
    }
  }

  if (body.price !== undefined && !isNonNegativeNumber(body.price)) {
    throw new ApiError(400, 'price must be a non-negative number');
  }
  if (body.discountPrice !== undefined) {
    if (!isNonNegativeNumber(body.discountPrice)) {
      throw new ApiError(400, 'discountPrice must be a non-negative number');
    }
    const basePrice = body.price !== undefined ? body.price : null;
    if (basePrice !== null && body.discountPrice >= basePrice) {
      throw new ApiError(400, 'discountPrice must be less than price');
    }
  }
  if (body.category !== undefined && !isObjectId(body.category)) {
    throw new ApiError(400, 'Invalid category id');
  }
  if (body.stock !== undefined && !isNonNegativeNumber(body.stock)) {
    throw new ApiError(400, 'stock must be a non-negative number');
  }
  if (body.weightOptions !== undefined) {
    if (!Array.isArray(body.weightOptions)) {
      throw new ApiError(400, 'weightOptions must be an array');
    }
    for (const opt of body.weightOptions) {
      if (!opt.label || !isNonNegativeNumber(opt.price)) {
        throw new ApiError(
          400,
          'Each weight option requires a label and a non-negative price'
        );
      }
    }
  }
  if (body.images !== undefined) {
    if (!Array.isArray(body.images)) {
      throw new ApiError(400, 'images must be an array');
    }
    for (const img of body.images) {
      if (!img.url || !img.publicId) {
        throw new ApiError(400, 'Each image requires url and publicId');
      }
    }
  }
};

const listProducts = asyncHandler(async (req, res) => {
  const result = await productService.listProducts(req.query);
  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const result = await productService.getFeaturedProducts(req.query);
  res.status(200).json({
    success: true,
    message: 'Featured products retrieved successfully',
    data: result,
  });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);
  res.status(200).json({
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid product id');
  }
  const product = await productService.getActiveProductById(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  validateProductBody(req.body);
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid product id');
  }
  validateProductBody(req.body, true);
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid product id');
  }
  await productService.deleteProduct(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

module.exports = {
  listProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
