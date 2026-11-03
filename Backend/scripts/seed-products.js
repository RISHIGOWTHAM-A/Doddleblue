/* Seed Royal Sweets catalogue into MongoDB — run: node scripts/seed-products.js */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/product.model');
const Category = require('../src/models/category.model');

const CATS = [
  { name: 'Laddus', description: 'Hand-rolled festive laddus in pure ghee' },
  { name: 'Barfis', description: 'Silky milk and nut fudges, layered with silver' },
  { name: 'Jalebis', description: 'Crisp syrup-soaked spirals, fresh off the kadhai' },
  { name: 'Milk Sweets', description: 'Rich classics made with pure milk and khoya' },
  { name: 'Savories', description: 'Crunchy namkeens and festival savories' },
  { name: 'Gift Packs', description: 'Curated royal boxes for every celebration' },
];

const img = (url) => ({ url, publicId: `seed/${url.split('/').pop().split('?')[0]}` });

const P = [
  { name: 'Mysore Pak', cat: 'Milk Sweets', price: 299, discountPrice: 250, featured: true, stock: 40, rating: 4.8, count: 128,
    desc: 'The legendary melt-in-mouth besan sweet from Mysuru, slow-roasted in generous pure ghee until golden and porous.',
    img: 'https://godavarivantillu.com/cdn/shop/products/mysorepak_720x.png',
    weights: [['500g', 250, 20], ['1kg', 480, 10]], ing: 'Besan, Sugar, Pure Ghee', all: 'Dairy' },
  { name: 'Motichoor Laddu', cat: 'Laddus', price: 340, discountPrice: 320, featured: true, stock: 55, rating: 4.7, count: 96,
    desc: 'Tiny pearls of besan fried in ghee, bound with fragrant syrup and rolled by hand — the festival essential.',
    img: 'https://www.jcookingodyssey.com/wp-content/uploads/2020/08/motichoor-ladoo-recipe-17.jpg',
    weights: [['500g', 320, 18], ['1kg', 620, 9]], ing: 'Besan, Sugar, Ghee, Cardamom, Melon Seeds', all: 'Dairy' },
  { name: 'Pista Barfi', cat: 'Barfis', price: 500, discountPrice: 450, featured: true, stock: 30, rating: 4.6, count: 74,
    desc: 'Velvety pistachio fudge with a whisper of cardamom — rich, nutty and impossibly smooth.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2017/10/badam-burfi-recipe-1.jpg',
    weights: [['250g', 240, 12], ['500g', 450, 8]], ing: 'Pistachios, Milk, Sugar, Ghee, Cardamom', all: 'Dairy, Nuts' },
  { name: 'Gulab Jamun', cat: 'Milk Sweets', price: 320, discountPrice: 280, featured: true, stock: 60, rating: 4.8, count: 210,
    desc: 'Soft khoya dumplings soaked in rose-cardamom syrup — served warm, loved by every generation since 1985.',
    img: 'https://images.pexels.com/photos/8887053/pexels-photo-8887053.jpeg?auto=compress&cs=tinysrgb&w=800',
    weights: [['500g (12pc)', 280, 20], ['1kg (24pc)', 540, 10]], ing: 'Khoya, Maida, Sugar, Rose, Cardamom', all: 'Dairy, Gluten' },
  { name: 'Badam Halwa', cat: 'Milk Sweets', price: 400, discountPrice: 349, featured: true, stock: 25, rating: 4.7, count: 88,
    desc: 'Slow-stirred almond halwa enriched with saffron and ghee — a royal Tamil Nadu classic.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/10/badam-halwa-recipe.jpg',
    weights: [['500g', 349, 15]], ing: 'Almonds, Milk, Sugar, Saffron, Ghee', all: 'Dairy, Nuts' },
  { name: 'Kaju Katli', cat: 'Barfis', price: 950, discountPrice: 849, featured: true, stock: 35, rating: 4.9, count: 156,
    desc: 'Silky cashew fudge layered with edible silver leaf — our signature royal sweet, stone-ground fresh every morning.',
    img: 'https://cdn.shopaccino.com/indian-sweet-shop/products/imgp7051-400116_l.jpg',
    weights: [['250g', 240, 15], ['500g', 460, 12], ['1kg', 849, 6]], ing: 'Cashews, Sugar, Ghee, Cardamom', all: 'Nuts' },
  { name: 'Jangiri', cat: 'Jalebis', price: 360, featured: false, stock: 45, rating: 4.5, count: 61,
    desc: 'Intricate urad-dal blooms soaked in saffron syrup — the South Indian answer to jalebi, crisp outside, juicy inside.',
    img: 'https://www.sharmispassions.com/wp-content/uploads/2020/11/jangiri-recipe.jpg',
    weights: [['500g', 360, 15]], ing: 'Urad Dal, Sugar, Saffron, Ghee', all: 'Dairy' },
  { name: 'Besan Laddu', cat: 'Laddus', price: 300, discountPrice: null, featured: false, stock: 50, rating: 4.6, count: 92,
    desc: 'Golden roasted besan folded into pure ghee and jaggery-sweet syrup — warm, nutty, nostalgic.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/09/besan-ladoo-recipe-1.jpg',
    weights: [['500g', 300, 20]], ing: 'Besan, Ghee, Sugar, Cardamom, Cashews', all: 'Dairy, Nuts' },
  { name: 'Rasmalai', cat: 'Milk Sweets', price: 420, featured: false, stock: 22, rating: 4.7, count: 83,
    desc: 'Feather-light chhena discs resting in saffron-kissed chilled rabri, crowned with pistachio slivers.',
    img: 'https://i0.wp.com/dfth3plj0yr6j.cloudfront.net/wp-content/uploads/2021/04/rasmalai.jpg',
    weights: [['500g (8pc)', 420, 12]], ing: 'Milk, Saffron, Pistachios, Sugar, Cardamom', all: 'Dairy, Nuts' },
  { name: 'Murukku', cat: 'Savories', price: 220, featured: false, stock: 70, rating: 4.4, count: 45,
    desc: 'Crisp rice-and-urad spirals seasoned with cumin — the crunchy companion to every sweet box.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/09/murukku-recipe.jpg',
    weights: [['500g', 220, 30]], ing: 'Rice Flour, Urad Dal, Butter, Cumin, Sesame', all: 'Dairy, Sesame' },
  { name: 'Royal Assorted Box', cat: 'Gift Packs', price: 1200, discountPrice: 999, featured: true, stock: 18, rating: 4.9, count: 134,
    desc: 'Our grand gifting box — 24 pieces of kaju katli, mysore pak, badam burfi and motichoor laddu in gold-foil packaging.',
    img: 'https://i.pinimg.com/736x/b7/63/05/b76305e75ff0a4d3a9966b17cbdd5ff0.jpg',
    weights: [['24pc box', 999, 18]], ing: 'Assorted — see individual sweets', all: 'Dairy, Nuts, Gluten' },
  { name: 'Mini Sweet Hamper', cat: 'Gift Packs', price: 650, discountPrice: null, featured: false, stock: 25, rating: 4.5, count: 52,
    desc: 'A petite royal hamper — 12 assorted pieces, perfect for small celebrations and thank-yous.',
    img: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/6123/applications/6540fb587c9ad5e1e1163228/blogs/pictures/free-featured/original/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpeg',
    weights: [['12pc box', 650, 25]], ing: 'Assorted', all: 'Dairy, Nuts' },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected — seeding…');
  const catIds = {};
  for (const c of CATS) {
    const doc = await Category.findOneAndUpdate({ name: c.name }, { $set: c }, { upsert: true, new: true });
    catIds[c.name] = doc._id;
  }
  for (const p of P) {
    await Product.findOneAndUpdate(
      { name: p.name },
      {
        $set: {
          name: p.name, description: p.desc, price: p.price,
          category: catIds[p.cat], images: [img(p.img)], stock: p.stock,
          weightOptions: p.weights.map(([label, price, stock]) => ({ label, price, stock })),
          ingredients: p.ing.split(', '), allergens: p.all.split(', '),
          isFeatured: p.featured, isActive: true,
          ratingsAverage: p.rating, ratingsCount: p.count,
          ...(p.discountPrice ? { discountPrice: p.discountPrice } : {}),
        },
        ...(p.discountPrice ? {} : { $unset: { discountPrice: 1 } }),
      },
      { upsert: true, runValidators: true }
    );
    console.log(`  ✓ ${p.name}`);
  }
  console.log(`Done — ${P.length} products, ${CATS.length} categories.`);
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e.message); process.exit(1); });
