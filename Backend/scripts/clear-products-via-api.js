/* Deletes ALL products (keeps categories) — admin adds real products. Run: node scripts/clear-products-via-api.js */
require('dotenv').config();
const BASE = `http://127.0.0.1:${process.env.PORT || 5000}/api`;

const api = async (path, method, body, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { ok: r.ok, j: await r.json().catch(() => ({})) };
};

const run = async () => {
  const login = await api('/auth/admin/login', 'POST', { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  if (!login.ok) throw new Error('Admin login failed');
  const token = login.j.data.token;
  const res = await api('/products?limit=200', 'GET');
  const products = res.j.data?.items ?? res.j.data?.products ?? [];
  for (const p of products) {
    const r = await api(`/products/${p._id}`, 'DELETE', undefined, token);
    console.log(r.ok ? `  ✓ deleted ${p.name}` : `  ! ${p.name}: ${r.j.message}`);
  }
  console.log(`Done — removed ${products.length} products. Categories kept.`);
};

run().catch((e) => { console.error(e.message); process.exit(1); });
