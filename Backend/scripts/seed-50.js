// Seeds ~50 products across all categories via the running backend API.
// Run: node scripts/seed-50.js   (requires ADMIN_EMAIL/ADMIN_PASSWORD in .env)
require('dotenv').config();
const BASE = 'http://127.0.0.1:5000/api';
const IMG = (slug) => `https://placehold.co/800x800/F7F0E2/701F2C?text=${encodeURIComponent(slug)}`;

const NAMES = {
  Laddus: ['Motichoor Laddu', 'Besan Laddu', 'Coconut Laddu', 'Boondi Laddu', 'Rava Laddu', 'Dry Fruit Laddu', 'Til Laddu', 'Gond Laddu', 'Malai Laddu'],
  Barfis: ['Kaju Katli', 'Pista Barfi', 'Badam Barfi', 'Chocolate Barfi', 'Coconut Barfi', 'Kesar Barfi', 'Anjeer Barfi', 'Milk Cake', 'Kalakand'],
  Jalebis: ['Jangiri', 'Jalebi Classic', 'Kesar Jalebi', 'Rabri Jalebi', 'Mini Jalebi', 'Imarti'],
  'Milk Sweets': ['Rasmalai', 'Badam Halwa', 'Gulab Jamun', 'Rasgulla', 'Mysore Pak', 'Kova Peda', 'Basundi Cups', 'Cham Cham', 'Kesar Peda', 'Rajbhog'],
  Savories: ['Murukku', 'Ribbon Pakoda', 'Kara Sev', 'Mixture', 'Kara Boondi', 'Omapodi', 'Thattai', 'Navadhaniya Mix'],
  'Gift Packs': ['Royal Assorted Box', 'Mini Sweet Hamper', 'Diwali Deluxe Box', 'Wedding Favour Box', 'Premium Dry Fruit Box', 'Festival Sampler'],
};

const run = async () => {
  const login = await fetch(`${BASE}/auth/admin/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }),
  }).then((r) => r.json());
  const token = login.data?.token || login.token;

  const cats = (await fetch(`${BASE}/categories`).then((r) => r.json())).data;
  const catMap = Object.fromEntries(cats.map((c) => [c.name, c._id]));

  let created = 0, skipped = 0;
  for (const [catName, list] of Object.entries(NAMES)) {
    const catId = catMap[catName];
    if (!catId) { console.log(`  ! category missing: ${catName}`); continue; }
    for (const name of list) {
      const price = 200 + Math.floor(Math.random() * 600);
      const body = {
        name, category: catId, price, stock: 20 + Math.floor(Math.random() * 60),
        description: `${name} — handcrafted fresh daily in pure desi ghee.`,
        images: [{ url: IMG(name), publicId: `seed/${name.replace(/\s+/g, '-')}` }],
        weightOptions: [{ label: '500g', price: Math.round(price / 2), stock: 25 }, { label: '1kg', price, stock: 15 }],
        isFeatured: created < 4, isActive: true,
      };
      const r = await fetch(`${BASE}/products`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (r.ok) { created++; console.log(`  + ${name}`) }
      else { skipped++; console.log(`  ~ ${name}: ${j.message?.slice(0, 60) || 'exists'}`) }
    }
  }
  console.log(`Done — ${created} created, ${skipped} skipped/failed`);
};
run().catch((e) => console.error(e.message));
