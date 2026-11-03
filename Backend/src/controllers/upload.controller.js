const uploadService = require('../services/upload.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { missingFields } = require('../utils/validators');

const getUploadSignature = asyncHandler(async (req, res) => {
  const params = uploadService.generateUploadSignature(req.body.folder);
  res.status(200).json({
    success: true,
    message: 'Upload signature generated successfully',
    data: params,
  });
});

const deleteImage = asyncHandler(async (req, res) => {
  const missing = missingFields(req.body, ['publicId']);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }

  await uploadService.deleteImage(req.body.publicId);
  res.status(200).json({
    success: true,
    message: 'Image deleted successfully',
  });
});

module.exports = { getUploadSignature, deleteImage };
