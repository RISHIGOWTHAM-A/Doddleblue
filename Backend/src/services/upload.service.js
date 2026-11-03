const { cloudinary, isConfigured } = require('../config/cloudinary');
const env = require('../config/env');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');

const ALLOWED_FOLDERS = ['royal-sweets/products', 'royal-sweets/categories'];

const ensureConfigured = () => {
  if (!isConfigured()) {
    throw new ApiError(
      500,
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env'
    );
  }
};

const generateUploadSignature = (folder) => {
  ensureConfigured();

  const target = ALLOWED_FOLDERS.includes(folder)
    ? folder
    : 'royal-sweets/products';

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = { timestamp, folder: target };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    env.cloudinary.apiSecret
  );

  return {
    ...paramsToSign,
    signature,
    apiKey: env.cloudinary.apiKey,
    cloudName: env.cloudinary.cloudName,
  };
};

const deleteImage = async (publicId) => {
  ensureConfigured();

  const [product, category] = await Promise.all([
    Product.findOne({ 'images.publicId': publicId }).select('_id'),
    Category.findOne({ 'image.publicId': publicId }).select('_id'),
  ]);
  if (!product && !category) {
    throw new ApiError(
      404,
      'Image not found or is not associated with any resource'
    );
  }

  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result !== 'ok' && result.result !== 'not found') {
    throw new ApiError(502, 'Cloudinary failed to delete the image');
  }

  if (product) {
    await Product.updateOne(
      { _id: product._id },
      { $pull: { images: { publicId } } }
    );
  }
  if (category) {
    await Category.updateOne({ _id: category._id }, { $unset: { image: '' } });
  }

  return result;
};

module.exports = { generateUploadSignature, deleteImage, ALLOWED_FOLDERS };
