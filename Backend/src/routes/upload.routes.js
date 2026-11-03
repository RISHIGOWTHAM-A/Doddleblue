const express = require('express');
const uploadController = require('../controllers/upload.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate, authorize('admin'));

router.post('/signature', uploadController.getUploadSignature);
router.delete('/', uploadController.deleteImage);

module.exports = router;
