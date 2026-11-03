const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
      _id: false,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.pre('validate', function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

module.exports = mongoose.model('Category', categorySchema);
