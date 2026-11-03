# ROYAL SWEETS — Backend API

REST API for the Royal Sweets e-commerce platform. Node.js + Express (CommonJS) + MongoDB (Mongoose) + JWT auth + Cloudinary signed uploads. Cash-on-Delivery orders only.

## Tech Stack

| Package | Purpose |
|---|---|
| express | HTTP server / REST routing |
| mongoose | MongoDB ODM |
| jsonwebtoken | Access tokens (1 h expiry, `JWT_ACCESS_SECRET` only — no refresh tokens) |
| bcryptjs | Password hashing (cost 12, salted on save) |
| cloudinary | Signed direct-to-Cloudinary uploads (no Multer) |
| dotenv | Environment config |
| cors | Locked to `CLIENT_URL` |
| cookie-parser | `accessToken` httpOnly cookie support |

## Setup

```bash
cd Backend
npm install
cp .env.example .env     # fill in values
npm run seed:admin       # creates the admin account from .env
npm run dev              # node --watch, default port 5000
```

### Environment variables

```env
PORT=5000                    # NOTE: browsers block port 6000 (unsafe-port list) — do not use 6000 for a web frontend
NODE_ENV=development
MONGODB_URI=                 # Atlas: mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/royal_sweets?retryWrites=true&w=majority
JWT_ACCESS_SECRET=           # any long random string
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=                 # consumed by seed script only
ADMIN_PASSWORD=              # consumed by seed script only
```

`MONGODB_URI`, `JWT_ACCESS_SECRET` and `CLIENT_URL` are validated at boot — the server refuses to start without them. The DB name is forced to `royal_sweets` in `src/config/db.js`.

### Admin account

There is **no public admin registration** — `POST /api/auth/register` always forces `role: "customer"`. The only way an admin exists is the seed script, which reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `.env` (hashed via bcrypt, never stored plain). Re-running promotes an existing account instead of duplicating.

```bash
npm run seed:admin
# login: POST /api/auth/admin/login  {email, password}
```

## Testing

Use Postman (or any API client) against `http://localhost:5000/api`. Suggested order: `GET /health` → `POST /auth/register` → use the returned token for `/cart`, `/orders`, `/admin/*` calls.

## API Reference

All responses: `{ success, message, data? }`. Auth = `Authorization: Bearer <token>` header **or** `accessToken` httpOnly cookie.

### Auth — `/api/auth`
| Method | Path | Access | Notes |
|---|---|---|---|
| POST | `/register` | public | forces `role=customer` (client-sent role ignored) |
| POST | `/login` | public | any role |
| POST | `/admin/login` | public | 403 unless account is admin |
| POST | `/logout` | public | clears cookie |
| GET | `/me` | auth | profile (never includes password) |
| PUT | `/me` | auth | update name/phone/address |
| PUT | `/change-password` | auth | `{currentPassword, newPassword}` |

### Categories — `/api/categories`
| Method | Path | Access |
|---|---|---|
| GET | `/` | public (active only) |
| GET | `/:id` | public |
| POST | `/` | admin |
| PUT | `/:id` | admin |
| DELETE | `/:id` | admin — **400 if any product uses it** |

### Products — `/api/products`
| Method | Path | Access | Query/Notes |
|---|---|---|---|
| GET | `/` | public (active only) | `search`, `category` (id or slug), `minPrice`, `maxPrice` (uses `discountPrice` when set), `sort` (`price_asc`, `price_desc`, `newest`, `oldest`, `name_asc`), `page`, `limit` (≤50), `featured=true` |
| GET | `/featured` | public | same pagination |
| GET | `/slug/:slug` | public | |
| GET | `/:id` | public | |
| GET | `/:productId/reviews` | public | paginated |
| POST | `/:productId/reviews` | customer | `{rating 1–5, comment}` — only after a **delivered** order containing the product; one review per customer per product |
| POST | `/` | admin | |
| PUT | `/:id` | admin | whitelisted fields only |
| DELETE | `/:id` | admin | |

### Cart — `/api/cart` (auth, always scoped to the caller)
| Method | Path | Notes |
|---|---|---|
| GET | `/` | items enriched with live prices, `subtotal`, `total`, `unavailable` flags |
| POST | `/items` | `{productId, weightOption?, quantity}` — validates product active, option exists, stock |
| PUT | `/items` | `{productId, weightOption?, quantity}` — `quantity: 0` removes |
| DELETE | `/items/:productId?weightOption=` | remove one line |
| DELETE | `/` | clear cart |

Prices are **always recalculated from the DB** — frontend-sent prices are ignored.

### Orders — `/api/orders` (customer) + `/api/admin/orders` (admin)
| Method | Path | Access | Notes |
|---|---|---|---|
| POST | `/api/orders` | customer | `{shippingAddress}` — COD only; validates cart, decrements stock atomically (transaction where supported), clears cart |
| GET | `/api/orders/my-orders` | customer | paginated |
| GET | `/api/orders/:id` | customer | own orders only (404 for others') |
| GET | `/api/orders/:id/track` | customer | status view |
| GET | `/api/admin/orders` | admin | `?status=` filter + pagination |
| PUT | `/api/admin/orders/:id/status` | admin | `pending → confirmed → processing → shipped → delivered / cancelled`; delivered sets `paymentStatus=paid` |

Delivery fee: ₹50, free above ₹500 (constants in `order.service.js`).

### Admin — `/api/admin`
| Method | Path | Notes |
|---|---|---|
| GET | `/users` | all users + roles (`?role=customer\|admin`) |
| GET | `/users/:id` | |
| DELETE | `/users/:id` | cascades: deletes their **cart** + **reviews** (ratings recalculated). Admins & self cannot be deleted. Orders are kept as records. |
| GET | `/stats` | products, customers, orders, pending/delivered, revenue (non-cancelled), inventory + low-stock list |

### Uploads — `/api/uploads` (admin)
| Method | Path | Notes |
|---|---|---|
| POST | `/signature` | `{folder?}` → `{timestamp, signature, apiKey, cloudName, folder}` — frontend then POSTs the file directly to `https://api.cloudinary.com/v1_1/<cloudName>/image/upload` |
| DELETE | `/` | `{publicId}` — only deletes IDs that exist in a Product/Category document (no arbitrary deletion); also removes the reference in MongoDB |

The API secret is never returned. Signature expiry: Cloudinary signed params are valid for 1 h by default.

## Architecture

```
src/
├── config/        env (validated), db (mongoose), cloudinary
├── models/        user, category, product, cart, order, review
├── services/      business logic (pricing, stock, transactions, stats)
├── controllers/   input validation → service → uniform JSON
├── middleware/    auth.middleware (JWT + roles), errorHandler (404 + central)
├── routes/        per-resource routers mounted in app.js
├── seed/          admin.seed.js
└── utils/         ApiError, asyncHandler, validators, slugify
```

## Security notes

- Passwords: bcrypt hash only; `select: false` on the field; never serialized.
- Roles: server-side only — `req.body.role` is never trusted.
- Ownership: cart/order queries are always scoped to `req.user._id`; foreign orders return 404 (not 403) to avoid leaking existence.
- Stock: decremented via conditional `$inc` with `$gte` guard — can never go negative, even under race conditions. Order placement runs in a MongoDB transaction when the deployment supports it (replica set / Atlas); standalone servers fall back to sequential ops.
- Error handler maps: CastError→400, ValidationError→400, duplicate key→409, JWT errors→401. 500s return a generic message (details logged server-side only).
