import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, PackageCheck, ShoppingBag } from 'lucide-react'
import { getMyOrders } from '../../api/orders.api'
import { RequireCustomer } from '../../components/require-permission'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const STATUS = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', processing: 'bg-indigo-100 text-indigo-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-700' }

const OrdersView = () => {
  const [orders, setOrders] = useState(null)
  useEffect(() => {
    getMyOrders().then((d) => setOrders(Array.isArray(d) ? d : d?.items ?? [])).catch(() => setOrders([]))
  }, [])

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-serif text-3xl font-semibold text-maroon">My Orders</h1>
        {!orders ? <div className="mt-8 h-40 animate-pulse rounded-2xl bg-cream-dark" />
          : orders.length === 0 ? (
            <div className="py-24 text-center">
              <PackageCheck className="mx-auto size-14 text-gold/50" />
              <p className="mt-4 font-serif text-xl text-maroon/70">No orders yet</p>
              <Link to="/products" className="mt-5 inline-block rounded-full bg-maroon px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream hover:bg-maroon-dark">Shop sweets</Link>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {orders.map((o) => {
                const a = o.shippingAddress || {}
                return (
                  <div key={o._id} className="rounded-2xl border border-gold/30 bg-warm-white p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-ink/50">Order <span className="font-semibold text-maroon">#{o._id.slice(-8).toUpperCase()}</span></p>
                        <p className="mt-1 text-xs text-ink/50">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <span className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${STATUS[o.orderStatus] || 'bg-gold/20 text-maroon'}`}>{o.orderStatus}</span>
                    </div>
                    {o.orderStatus === 'cancelled' ? (
                      <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700">This order was cancelled.</p>
                    ) : (
                      <div className="mt-5 flex items-center">
                        {STEPS.map((s, i) => {
                          const active = STEPS.indexOf(o.orderStatus) >= i
                          return (
                            <div key={s} className="flex flex-1 items-center last:flex-none">
                              <div className="flex flex-col items-center">
                                <span className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${active ? 'bg-maroon text-cream' : 'bg-gold/20 text-ink/40'}`}>{active ? '✓' : i + 1}</span>
                                <span className={`mt-1.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wider ${active ? 'text-maroon' : 'text-ink/35'}`}>{s}</span>
                              </div>
                              {i < STEPS.length - 1 && <span className={`mx-1.5 mb-4 h-px flex-1 ${STEPS.indexOf(o.orderStatus) > i ? 'bg-maroon' : 'bg-gold/25'}`} />}
                            </div>
                          )
                        })}
                      </div>
                    )}
                    <div className="mt-4 grid gap-6 md:grid-cols-[1fr_280px]">
                      <ul className="space-y-3">
                        {(o.items || []).map((i, k) => (
                          <li key={k} className="flex items-center justify-between text-sm">
                            <span className="text-ink/80"><b className="text-maroon">{i.name}</b>{i.weightOption ? ` · ${i.weightOption}` : ''} × {i.quantity}</span>
                            <span className="font-semibold">{inr(i.lineTotal ?? i.price * i.quantity)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between border-t border-gold/20 pt-3 text-sm"><span className="font-semibold text-maroon">Total (COD)</span><span className="font-serif text-lg font-bold text-maroon">{inr(o.totalAmount)}</span></li>
                      </ul>
                      <div className="rounded-xl border border-gold/25 bg-cream p-4 text-sm">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold"><MapPin className="size-3.5" /> Shipping to</p>
                        <p className="mt-2.5 font-semibold text-maroon">{a.fullName}</p>
                        <p className="mt-1 leading-5 text-ink/65">{a.street}<br />{a.city}, {a.state} {a.postalCode}<br />{a.country}</p>
                        <p className="mt-2 text-ink/65">{a.phone}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
      </main>
      <Footer />
    </div>
  )
}

const OrdersPage = () => <RequireCustomer adminHref="/admin"><OrdersView /></RequireCustomer>
export default OrdersPage
