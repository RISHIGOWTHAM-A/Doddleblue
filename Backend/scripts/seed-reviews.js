// Seeds one review per product via the real API (order → deliver → review).
// Run: node scripts/seed-reviews.js
require('dotenv').config();
const B = 'http://127.0.0.1:5000/api';
const H = { 'Content-Type': 'application/json' };
const req = (p, m, b, t) => fetch(B + p, {
  method: m, headers: { ...H, ...(t ? { Authorization: `Bearer ${t}` } : {}) },
  body: b ? JSON.stringify(b) : undefined,
}).then((r) => r.json());

const REVS = [
  ['Badam Halwa', 5, 'Melt-in-mouth perfection — the saffron aroma is unreal.'],
  ['Kaju Katli', 5, 'Silky smooth, just like my grandmother used to make.'],
  ['Jangiri', 4, 'Crisp outside, juicy inside — freshly made.'],
  ['Besan Laddu', 5, 'Warm, nutty and not too sweet — perfect with chai.'],
  ['Rasmalai', 5, 'Feather-light and the rabri is divine.'],
  ['Murukku', 4, 'Perfect crunch — my evening snack sorted.'],
  ['Royal Assorted Box', 5, 'Gifted this — the box alone is worth the price.'],
  ['Mini Sweet Hamper', 4, 'Cute little hamper, perfect for small occasions.'],
  ['Festival Sampler', 5, 'Great way to try everything — nothing was bad!'],
  ['Diwali Deluxe Box', 5, 'Best diwali gift box hands down.'],
  ['Premium Dry Fruit Box', 5, 'Premium box, premium taste.'],
  ['Wedding Favour Box', 4, 'Guests loved the favours.'],
  ['Motichoor Laddu', 5, 'Fresh, fragrant, melts instantly.'],
  ['Mysore Pak', 5, 'The legendary ghee-rich texture — spot on.'],
  ['Pista Barfi', 5, 'Nutty and creamy — instant favourite.'],
  ['Gulab Jamun', 5, 'Soft, warm, soaked just right.'],
];

(async () => {
  const ad = await req('/auth/admin/login', 'POST', { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  const at = ad.data?.token || ad.token;
  const EMAIL = 'reviewer@royalsweets.test';
  let cu = await req('/auth/register', 'POST', { name: 'Sweet Lover', email: EMAIL, password: 'Password123' });
  let ct = cu.data?.token || cu.token;
  if (!ct) {
    cu = await req('/auth/login', 'POST', { email: EMAIL, password: 'Password123' });
    ct = cu.data?.token || cu.token;
  }
  if (!ct) { console.log('customer login failed:', cu.message); return; }
  const prods = (await req('/products?limit=60', 'GET')).data.items;
  const byName = Object.fromEntries(prods.map((p) => [p.name, p]));
  const addr = { fullName: 'Mani', phone: '9000000000', street: '1 Sweet St', city: 'Chennai', state: 'TN', postalCode: '600001', country: 'India' };
  for (const [name, rating, comment] of REVS) {
    const p = byName[name];
    if (!p) { console.log('~', name); continue; }
    const w = p.weightOptions?.[0]?.label;
    await req('/cart/items', 'POST', { productId: p._id, weightOption: w, quantity: 1 }, ct);
    const o = await req('/orders', 'POST', { shippingAddress: addr }, ct);
    const oid = o.data?._id;
    if (oid) await req(`/admin/orders/${oid}/status`, 'PUT', { status: 'delivered' }, at);
    const rv = await req(`/products/${p._id}/reviews`, 'POST', { rating, comment }, ct);
    console.log(rv.success ? '✓' : '✗', name, rv.message || '');
  }
  console.log('Done');
})();
