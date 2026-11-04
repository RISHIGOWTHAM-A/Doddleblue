const Contact = require('../models/contact.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) throw new ApiError(400, 'name, email and message are required');
  const c = await Contact.create({ name, email, subject, message });
  res.status(201).json({ success: true, message: 'Message sent — we will get back to you soon', data: c });
});

const listContacts = asyncHandler(async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
});

const markRead = asyncHandler(async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!c) throw new ApiError(404, 'Message not found');
  res.json({ success: true, data: c });
});

const replyContact = asyncHandler(async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, { reply: req.body.reply, repliedAt: new Date() }, { new: true });
  if (!c) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: c });
});

const myContacts = asyncHandler(async (req, res) => {
  const data = await Contact.find({ email: req.user.email, reply: { $exists: true, $ne: null } }).sort({ repliedAt: -1 });
  res.json({ success: true, data });
});

const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

module.exports = { submitContact, listContacts, markRead, replyContact, myContacts, deleteContact };
