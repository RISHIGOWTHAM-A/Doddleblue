import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStats } from './_hooks/useAdminStats'
import { apiFetch } from '../../api/apiClient'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const StatCard = ({ label, value, sub }) => (
  <div className="rounded-2xl border border-gold/30 bg-white/60 p-6 transition hover:border-gold/60 hover:shadow-lg hover:shadow-maroon/10">
    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
      {label}
    </p>
    <p className="mt-3 font-serif text-4xl text-maroon">{value}</p>
    {sub && <p className="mt-1.5 text-xs text-ink/55">{sub}</p>}
  </div>
)

const AdminPage = () => {
  const { user, stats, error } = useAdminStats()
  const [orders, setOrders] = useState([])
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    apiFetch('/admin/orders?limit=5').then((r) => setOrders(r.data?.items ?? r.data ?? [])).catch(() => {})
    apiFetch('/contact').then((r) => setMsgs((r.data || []).slice(0, 5))).catch(() => {})
  }, [])

  return (
    <div>
      <main className="mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl text-maroon">
          Welcome back, {user?.name?.split(' ')[0] || 'Admin'}
        </h1>
        <p className="mt-1.5 text-sm text-ink/60">
          Here&apos;s how the store is doing today.
        </p>

        {error && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!stats && !error && (
          <p className="mt-16 text-center text-sm text-ink/50">Loading dashboard…</p>
        )}

        {stats && (
          <>
            {/* Stat cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Revenue"
                value={`₹${Number(stats.orders.revenue).toLocaleString('en-IN')}`}
                sub={`${stats.orders.delivered} delivered orders`}
              />
              <StatCard
                label="Orders"
                value={stats.orders.total}
                sub={`${stats.orders.pending} pending`}
              />
              <StatCard
                label="Customers"
                value={stats.customers.total}
                sub="registered accounts"
              />
              <StatCard
                label="Products"
                value={stats.products.active}
                sub={`${stats.products.total} total · ${stats.products.outOfStock} out of stock`}
              />
            </div>

            {/* Low stock alert */}
            <div className="mt-10 rounded-2xl border border-gold/30 bg-white/60 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-maroon">Low stock alert</h2>
                <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-maroon">
                  {stats.inventory.totalUnitsInStock} units in stock
                </span>
              </div>

              {stats.inventory.lowStockProducts.length === 0 ? (
                <p className="mt-4 text-sm text-ink/55">
                  All products are well stocked.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-gold/20">
                  {stats.inventory.lowStockProducts.map((p) => (
                    <li key={p.slug} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium text-ink">{p.name}</span>
                      <span className="rounded-full bg-maroon/10 px-3 py-1 text-xs font-semibold text-maroon">
                        {p.stock} left
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent orders + messages */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-gold/30 bg-white/60 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-maroon">Recent orders</h2>
                  <Link to="/admin/orders" className="text-xs font-semibold text-maroon hover:underline">View all →</Link>
                </div>
                {orders.length === 0 ? <p className="mt-4 text-sm text-ink/55">No orders yet.</p> : (
                  <ul className="mt-4 divide-y divide-gold/20">
                    {orders.slice(0, 5).map((o) => (
                      <li key={o._id} className="flex items-center justify-between py-3 text-sm">
                        <span><b className="text-maroon">#{o._id.slice(-6).toUpperCase()}</b><span className="ml-2 text-ink/55">{o.customer?.name || o.shippingAddress?.fullName || '—'}</span></span>
                        <span className="flex items-center gap-2"><b className="text-maroon">{inr(o.totalAmount)}</b><span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase text-maroon">{o.orderStatus}</span></span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="rounded-2xl border border-gold/30 bg-white/60 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-maroon">Latest messages</h2>
                  <Link to="/admin/messages" className="text-xs font-semibold text-maroon hover:underline">View all →</Link>
                </div>
                {msgs.length === 0 ? <p className="mt-4 text-sm text-ink/55">No messages yet.</p> : (
                  <ul className="mt-4 divide-y divide-gold/20">
                    {msgs.map((m) => (
                      <li key={m._id} className="py-3 text-sm">
                        <p className="flex items-center gap-2"><b className="text-maroon">{m.name}</b>{!m.isRead && <span className="rounded bg-gold/25 px-1.5 py-0.5 text-[10px] font-bold text-maroon">NEW</span>}</p>
                        <p className="mt-0.5 line-clamp-1 text-ink/55">{m.message}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminPage
