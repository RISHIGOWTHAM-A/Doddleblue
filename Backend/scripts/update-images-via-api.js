/* Updates product images to Pixabay photos via the running API. Run: node scripts/update-images-via-api.js */
require('dotenv').config();
const BASE = `http://127.0.0.1:${process.env.PORT || 5000}/api`;

const IMGS = {
  'Mysore Pak': 'https://pixabay.com/get/g575fefd109ca23acb7e4c0a7fb51bb521939825d39e68eff37b23e2bc6a407f4eab5c254a2cca7b938447b49e547cfbfe885fbf870db167553eb0c482751bcdf_1280.jpg',
  'Motichoor Laddu': 'https://pixabay.com/get/gc2df161f3d1b1efde8a673b9bc17f21034c5d8c13d08db9b80cefd0e6208dc9bc5a4f844f74cee312663e8694ba0eef468a6ceaae58cb8bc66c8019e554695c9_1280.jpg',
  'Besan Laddu': 'https://pixabay.com/get/g1a427cde76cc77e713e1ac26dac0ddc247a020d014a166b005e8b4dc37bed2831729b2b87f283bc0069c629531352a4d1fcce76d0315ada97d321ccec817a54f_1280.jpg',
  'Pista Barfi': 'https://pixabay.com/get/g983c7bcf2d7ebbf983c1e95c5e0c824bff9c6e1730cfacaaece90eb87426a81d277ab1af9664156541eb8d9fab4240d3a44f655611cd867b955cea95c6091f9b_1280.jpg',
  'Jangiri': 'https://pixabay.com/get/g155fe15a8d2b76e44e93b394603e6088e02abe0cfb3fc30a63295a71f8c6fa502587adc1a8b5b5dc8cfde58c9717a1e7d84e2d820ebd2504eaa70b5117a4d801_1280.jpg',
  'Gulab Jamun': 'https://pixabay.com/get/gd0207a305adb6d6396b162872dbc1baf2992257bb4f8c467e90da6d85563cc234947d03b69374b6719f17b9fa2c518747d887bac87c791c3c23e2b82364b5086_1280.jpg',
  'Badam Halwa': 'https://pixabay.com/get/g3e3ec5bc3d6a8da991dc5e2eae0ab8f89f8f0cd73f1506e5f66aa2854f2bd6c2fe4a17602c914f7f1ade1f8e1ce6b653d071439a0467c359bb96e09294b29c03_1280.jpg',
  'Kaju Katli': 'https://pixabay.com/get/g1b91f822e87e2688c735f2370ed784dec00bfe7f1980885cec01dc096b2bdf1e3936c56a2d349527c7c04392ba33b23b74238d3fd78bb796074791676c759cb1_1280.jpg',
  'Rasmalai': 'https://pixabay.com/get/g487c39f126480de9368ed24e980da994baface24fc80c7ba68e8f5de16a84cb3ec0f93c1f5db64e282ae5a7826b4331af74a30c39e2443c4f47948eb761606a2_1280.jpg',
  'Murukku': 'https://pixabay.com/get/gb86c7a1acab8882f0be382d1afca8912ccf480cecb36abb51ed8c9e642d7ac9780613eb2142d46ca847f2ba6efee10781d0dc239ee791ad7c7c9580827d479b5_1280.jpg',
  'Royal Assorted Box': 'https://pixabay.com/get/g30335e4a50a208b03ad6e433109f4a3c9724375b22e84819b5a36ed80a5ec3d1d7cb89f2c73f7c5c0ca4911ce12c87e2e9cd6bc5b76adf323325ab077c394202_1280.jpg',
  'Mini Sweet Hamper': 'https://pixabay.com/get/gf2abf012cd758c2ba85a450a0979eebf66c8c543b82e9fce15824b1ef47289be5f4ba4796e09732314d761181b622789062c3964ca4b21490d2ba2745992f05c_1280.jpg',
};

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

  const res = await api('/products?limit=100', 'GET');
  const products = res.j.data?.items ?? res.j.data?.products ?? [];
  for (const p of products) {
    const url = IMGS[p.name];
    if (!url) { console.log(`  - ${p.name} (no mapping)`); continue; }
    const r = await api(`/products/${p._id}`, 'PUT', { images: [{ url, publicId: `pixabay/${url.split('/').pop()}` }] }, token);
    console.log(r.ok ? `  ✓ ${p.name}` : `  ! ${p.name}: ${r.j.message}`);
  }
  console.log('Done — refresh /products & /home');
};

run().catch((e) => { console.error(e.message); process.exit(1); });
