import { useEffect, useState } from 'react'
import { getAdminOrders, updateOrderStatus } from '../_api/admin.api'

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`
const dt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(null)
  const load = () => getAdminOrders().then(setOrders).catch(() => setOrders([]))
  useEffect(() => { load() }, [])
  if (!orders) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Orders</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/30 bg-warm-white">
        <table className="w-full min-w-160 text-sm">
          <thead><tr className="border-b border-gold/25 text-left text-xs uppercase tracking-wider text-ink/50">
            <th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Items</th><th className="p-4">Total</th><th className="p-4">Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-gold/15 last:border-0">
                <td className="p-4 font-semibold text-maroon">#{o._id.slice(-6).toUpperCase()}</td>
                <td className="p-4 text-ink/70">{o.customer?.name || o.shippingAddress?.fullName || '—'}</td>
                <td className="p-4 text-ink/60">{dt(o.createdAt)}</td>
                <td className="p-4 text-ink/60">{(o.items || []).length}</td>
                <td className="p-4 font-semibold text-maroon">{inr(o.totalAmount)}</td>
                <td className="p-4">
                  <select value={o.orderStatus} onChange={async (e) => { await updateOrderStatus(o._id, e.target.value); load() }}
                    className="rounded-lg border border-gold/40 bg-cream px-2 py-1.5 text-xs font-semibold capitalize outline-none focus:border-maroon">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-10 text-center text-sm text-ink/50">No orders yet.</p>}
      </div>
    </div>
  )
}
export default AdminOrdersPage
