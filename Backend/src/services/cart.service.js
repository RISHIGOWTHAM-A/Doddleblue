const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const getOrCreateCart = async (customerId) => {
  let cart = await Cart.findOne({ customer: customerId });
  if (!cart) cart = await Cart.create({ customer: customerId, items: [] });
  return cart;
};

const resolvePricing = (product, weightOption) => {
  if (product.weightOptions.length > 0) {
    const option = product.weightOptions.find((o) => o.label === weightOption);
    if (!option) {
      throw new ApiError(
        400,
        `Invalid weight option. Available: ${product.weightOptions
          .map((o) => o.label)
          .join(', ')}`
      );
    }
    return { price: option.price, stock: option.stock };
  }
  return {
    price: product.discountPrice ?? product.price,
    stock: product.stock,
  };
};

const loadActiveProduct = async (productId) => {
  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) throw new ApiError(404, 'Product not found or unavailable');
  return product;
};

const findItem = (cart, productId, weightOption) =>
  cart.items.find(
    (i) =>
      i.product.toString() === productId.toString() &&
      (i.weightOption || null) === (weightOption || null)
  );

const addItem = async (customerId, { productId, weightOption, quantity }) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new ApiError(400, 'quantity must be a positive integer');
  }

  const product = await loadActiveProduct(productId);
  const { stock } = resolvePricing(product, weightOption);
  const cart = await getOrCreateCart(customerId);

  const existing = findItem(cart, productId, weightOption);
  const newQty = (existing ? existing.quantity : 0) + quantity;
  if (newQty > stock) {
    throw new ApiError(400, `Only ${stock} unit(s) available in stock`);
  }

  if (existing) existing.quantity = newQty;
  else cart.items.push({ product: productId, weightOption, quantity });

  await cart.save();
  return cart;
};

const updateQuantity = async (customerId, { productId, weightOption, quantity }) => {
  const cart = await getOrCreateCart(customerId);
  const item = findItem(cart, productId, weightOption);
  if (!item) throw new ApiError(404, 'Item not found in cart');

  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new ApiError(400, 'quantity must be a non-negative integer');
  }

  if (quantity === 0) {
    cart.items = cart.items.filter((i) => i !== item);
  } else {
    const product = await loadActiveProduct(productId);
    const { stock } = resolvePricing(product, weightOption);
    if (quantity > stock) {
      throw new ApiError(400, `Only ${stock} unit(s) available in stock`);
    }
    item.quantity = quantity;
  }

  await cart.save();
  return cart;
};

const removeItem = async (customerId, { productId, weightOption }) => {
  const cart = await getOrCreateCart(customerId);
  const item = findItem(cart, productId, weightOption);
  if (!item) throw new ApiError(404, 'Item not found in cart');

  cart.items = cart.items.filter((i) => i !== item);
  await cart.save();
  return cart;
};

const clearCart = async (customerId, session) => {
  const cart = await getOrCreateCart(customerId);
  cart.items = [];
  await cart.save(session ? { session } : undefined);
  return cart;
};

const getEnrichedCart = async (customerId) => {
  const cart = await getOrCreateCart(customerId);
  const items = [];
  let subtotal = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product).populate(
      'category',
      'name slug'
    );

    if (!product || !product.isActive) {
      items.push({
        product: item.product,
        weightOption: item.weightOption,
        quantity: item.quantity,
        unavailable: true,
        reason: 'Product no longer available',
      });
      continue;
    }

    let price;
    let stock;
    try {
      ({ price, stock } = resolvePricing(product, item.weightOption));
    } catch {
      items.push({
        product: product._id,
        name: product.name,
        weightOption: item.weightOption,
        quantity: item.quantity,
        unavailable: true,
        reason: 'Selected weight option no longer available',
      });
      continue;
    }

    const lineTotal = price * item.quantity;
    subtotal += lineTotal;
    items.push({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] || null,
      category: product.category,
      weightOption: item.weightOption,
      quantity: item.quantity,
      price,
      lineTotal,
      stock,
      unavailable: item.quantity > stock,
      reason: item.quantity > stock ? `Only ${stock} left in stock` : undefined,
    });
  }

  return { items, subtotal, total: subtotal };
};

module.exports = {
  getOrCreateCart,
  resolvePricing,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  getEnrichedCart,
};
