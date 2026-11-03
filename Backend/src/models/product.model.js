const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const weightOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: { type: [imageSchema], default: [] },
    weightOptions: { type: [weightOptionSchema], default: [] },
    stock: { type: Number, default: 0, min: 0 },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingsCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

productSchema.pre('validate', function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

module.exports = mongoose.model('Product', productSchema);
