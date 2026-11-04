const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
const uploadRoutes = require('./routes/upload.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/', (req, res) => res.send(`<!doctype html><html><head><title>Royal Sweets API</title>
<style>body{margin:0;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F7F0E2;color:#701F2C}
.c{text-align:center;padding:3rem;border:1px solid #C99A3C55;border-radius:1.5rem;background:#FFFCF7;box-shadow:0 20px 60px #701F2C22}
h1{margin:0 0 .4rem} .g{color:#C99A3C;letter-spacing:.3em;font-size:.75rem} p{color:#701F2C99;margin:.3rem 0}
a{display:inline-block;margin-top:1.2rem;background:#701F2C;color:#F7F0E2;padding:.8rem 2rem;border-radius:2rem;text-decoration:none;font-size:.8rem;letter-spacing:.15em}</style></head>
<body><div class="c"><div class="g">HANDCRAFTED SINCE 1985</div><h1>Royal Sweets</h1>
<p>API is live — the kitchen is open.</p><p>All routes under <b>/api</b></p>
<a href="/api/health">HEALTH CHECK →</a></div></body></html>`))

app.use(notFound);
app.use(errorHandler);

module.exports = app;
