/* Seeds the catalogue THROUGH the running API (localhost:5000) — bypasses Atlas DNS issues. */
require('dotenv').config();
const BASE = `http://127.0.0.1:${process.env.PORT || 5000}/api`;

const CATS = [
  { name: 'Laddus', description: 'Hand-rolled festive laddus in pure ghee' },
  { name: 'Barfis', description: 'Silky milk and nut fudges, layered with silver' },
  { name: 'Jalebis', description: 'Crisp syrup-soaked spirals, fresh off the kadhai' },
  { name: 'Milk Sweets', description: 'Rich classics made with pure milk and khoya' },
  { name: 'Savories', description: 'Crunchy namkeens and festival savories' },
  { name: 'Gift Packs', description: 'Curated royal boxes for every celebration' },
];

const img = (url) => [{ url, publicId: `seed/${url.split('/').pop().split('?')[0]}` }];

const P = [
  { name: 'Badam Halwa', cat: 'Milk Sweets', price: 400, discountPrice: 349, featured: true, stock: 25,
    desc: 'Slow-stirred almond halwa enriched with saffron and ghee — a royal Tamil Nadu classic.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/10/badam-halwa-recipe.jpg',
    weights: [{ label: '500g', price: 349, stock: 15 }], ing: 'Almonds, Milk, Sugar, Saffron, Ghee', all: 'Dairy, Nuts' },
  { name: 'Kaju Katli', cat: 'Barfis', price: 950, discountPrice: 849, featured: true, stock: 35,
    desc: 'Silky cashew fudge layered with edible silver leaf — our signature royal sweet, stone-ground fresh every morning.',
    img: 'https://cdn.shopaccino.com/indian-sweet-shop/products/imgp7051-400116_l.jpg',
    weights: [{ label: '250g', price: 240, stock: 15 }, { label: '500g', price: 460, stock: 12 }, { label: '1kg', price: 849, stock: 6 }], ing: 'Cashews, Sugar, Ghee, Cardamom', all: 'Nuts' },
  { name: 'Jangiri', cat: 'Jalebis', price: 360, featured: false, stock: 45,
    desc: 'Intricate urad-dal blooms soaked in saffron syrup — the South Indian answer to jalebi, crisp outside, juicy inside.',
    img: 'https://www.sharmispassions.com/wp-content/uploads/2020/11/jangiri-recipe.jpg',
    weights: [{ label: '500g', price: 360, stock: 15 }], ing: 'Urad Dal, Sugar, Saffron, Ghee', all: 'Dairy' },
  { name: 'Besan Laddu', cat: 'Laddus', price: 300, featured: false, stock: 50,
    desc: 'Golden roasted besan folded into pure ghee and jaggery-sweet syrup — warm, nutty, nostalgic.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/09/besan-ladoo-recipe-1.jpg',
    weights: [{ label: '500g', price: 300, stock: 20 }], ing: 'Besan, Ghee, Sugar, Cardamom, Cashews', all: 'Dairy, Nuts' },
  { name: 'Rasmalai', cat: 'Milk Sweets', price: 420, featured: false, stock: 22,
    desc: 'Feather-light chhena discs resting in saffron-kissed chilled rabri, crowned with pistachio slivers.',
    img: 'https://i0.wp.com/dfth3plj0yr6j.cloudfront.net/wp-content/uploads/2021/04/rasmalai.jpg',
    weights: [{ label: '500g (8pc)', price: 420, stock: 12 }], ing: 'Milk, Saffron, Pistachios, Sugar, Cardamom', all: 'Dairy, Nuts' },
  { name: 'Murukku', cat: 'Savories', price: 220, featured: false, stock: 70,
    desc: 'Crisp rice-and-urad spirals seasoned with cumin — the crunchy companion to every sweet box.',
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/09/murukku-recipe.jpg',
    weights: [{ label: '500g', price: 220, stock: 30 }], ing: 'Rice Flour, Urad Dal, Butter, Cumin, Sesame', all: 'Dairy, Sesame' },
  { name: 'Royal Assorted Box', cat: 'Gift Packs', price: 1200, discountPrice: 999, featured: true, stock: 18,
    desc: 'Our grand gifting box — 24 pieces of kaju katli, mysore pak, badam burfi and motichoor laddu in gold-foil packaging.',
    img: 'https://i.pinimg.com/736x/b7/63/05/b76305e75ff0a4d3a9966b17cbdd5ff0.jpg',
    weights: [{ label: '24pc box', price: 999, stock: 18 }], ing: 'Assorted — see individual sweets', all: 'Dairy, Nuts, Gluten' },
  { name: 'Mini Sweet Hamper', cat: 'Gift Packs', price: 650, featured: true, stock: 25,
    desc: 'A petite royal hamper — 12 assorted pieces, perfect for small celebrations and thank-yous.',
    img: 'https://deliciouskart.com/cdn/shop/articles/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpg?v=1792211479&width=800',
    weights: [{ label: '12pc box', price: 650, stock: 25 }], ing: 'Assorted', all: 'Dairy, Nuts' },
];

const api = async (path, method, body, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, j };
};

const run = async () => {
  const login = await api('/auth/admin/login', 'POST', { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  if (!login.ok) throw new Error(`Admin login failed (${login.status}): ${login.j.message || 'is the backend running?'}`);
  const token = login.j.data.token;
  console.log('Admin login ✓');

  const existing = await api('/categories', 'GET');
  const cats = existing.j.data?.categories ?? existing.j.data?.items ?? existing.j.data ?? [];
  const catIds = Object.fromEntries(cats.map((c) => [c.name, c._id]));
  for (const c of CATS) {
    if (catIds[c.name]) continue;
    const r = await api('/categories', 'POST', c, token);
    if (r.ok) { catIds[c.name] = r.j.data?._id ?? r.j.data?.category?._id; console.log(`  + cat ${c.name}`); }
    else console.log(`  ! cat ${c.name}: ${r.j.message}`);
  }

  const prods = await api('/products?limit=100', 'GET');
  const have = new Set((prods.j.data?.items ?? prods.j.data?.products ?? []).map((p) => p.name));
  for (const p of P) {
    if (have.has(p.name)) { console.log(`  = ${p.name} (exists)`); continue; }
    const r = await api('/products', 'POST', {
      name: p.name, description: p.desc, price: p.price, discountPrice: p.discountPrice,
      category: catIds[p.cat], stock: p.stock, images: img(p.img), weightOptions: p.weights,
      ingredients: p.ing.split(', '), allergens: p.all.split(', '), isFeatured: p.featured, isActive: true,
    }, token);
    console.log(r.ok ? `  ✓ ${p.name}` : `  ! ${p.name}: ${r.j.message}`);
  }
  console.log('Done — refresh /products');
};

run().catch((e) => { console.error(e.message); process.exit(1); });
