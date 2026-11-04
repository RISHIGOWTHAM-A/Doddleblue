const router = require('express').Router();
const { submitContact, listContacts, markRead, replyContact, myContacts, deleteContact } = require('../controllers/contact.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/', submitContact);
router.get('/my', authenticate, myContacts);
router.put('/:id/reply', authenticate, authorize('admin'), replyContact);
router.get('/', authenticate, authorize('admin'), listContacts);
router.put('/:id/read', authenticate, authorize('admin'), markRead);
router.delete('/:id', authenticate, authorize('admin'), deleteContact);

module.exports = router;
