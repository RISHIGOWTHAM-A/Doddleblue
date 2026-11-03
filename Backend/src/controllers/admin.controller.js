const userService = require('../services/user.service');
const statsService = require('../services/stats.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isObjectId } = require('../utils/validators');

const listUsers = asyncHandler(async (req, res) => {
  const result = await userService.listUsers(req.query);
  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getUser = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) throw new ApiError(400, 'Invalid user id');
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  if (!isObjectId(req.params.id)) throw new ApiError(400, 'Invalid user id');
  await userService.deleteUser(req.params.id, req.user._id);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await statsService.getDashboardStats();
  res.status(200).json({
    success: true,
    message: 'Statistics retrieved successfully',
    data: stats,
  });
});

module.exports = { listUsers, getUser, deleteUser, getStats };
