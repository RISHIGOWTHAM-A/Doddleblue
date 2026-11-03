import { useAdminStats } from './_hooks/useAdminStats'

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
          </>
        )}
      </main>
    </div>
  )
}

export default AdminPage
