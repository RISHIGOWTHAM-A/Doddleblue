import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Header from '../../home/_components/Header'
import Footer from '../../home/_components/Footer'
import useCart from '../_hooks/useCart'
import { placeOrder } from '../../../api/orders.api'
import { toast } from '../../../components/toast'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const EmptyCart = () => (
  <div className="py-24 text-center">
    <ShoppingBag className="mx-auto size-14 text-gold/50" />
    <h2 className="mt-4 font-serif text-2xl font-semibold text-maroon">Your cart is waiting for something sweet.</h2>
    <Link to="/products" className="mt-6 inline-block rounded-full bg-maroon px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream hover:bg-maroon-dark">Continue shopping</Link>
  </div>
)

const CartView = () => {
  const { cart, loading, error, busy, count, setQty, remove, clear, reload } = useCart()
  const navigate = useNavigate()
  const [ordering, setOrdering] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const items = cart?.items || []

  const [form, setForm] = useState({ fullName: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const checkout = async () => {
    setOrdering(true)
    try {
      await placeOrder({ shippingAddress: form })
      toast('Order placed — thank you!')
      navigate('/orders')
    } catch (e) { toast(e.message, 'error') }
    setOrdering(false)
  }
  const required = !['fullName', 'phone', 'street', 'city', 'state', 'postalCode'].every((k) => form[k]?.trim())

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-serif text-3xl font-semibold text-maroon">Your Bag</h1>
        {loading ? (
          <div className="mt-8 space-y-4">{[1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-cream-dark" />)}</div>
        ) : error ? (
          <div className="py-20 text-center"><p className="text-sm text-ink/60">{error}</p>
            <button onClick={reload} className="mt-4 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream">Try again</button></div>
        ) : items.length === 0 ? <EmptyCart /> : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              {items.map((it) => {
                const dead = it.unavailable === true || !it.product
                const pid = it.product?._id || it.product
                const p = it.product || {}
                const key = `${pid}-${it.weightOption || ''}`
                const price = p.discountPrice ?? it.price ?? p.price
                return (
                  <div key={key} className="mb-4 flex gap-4 rounded-2xl border border-gold/30 bg-warm-white p-4">
                    <Link to={`/product/${p.slug || p._id}`} className="shrink-0">
                      {p.images?.[0]?.url
                        ? <img src={p.images[0].url} alt={p.name} className="size-24 rounded-xl object-cover sm:size-28" />
                        : <div className="flex size-24 items-center justify-center rounded-xl bg-cream-dark text-ink/20 sm:size-28"><ShoppingBag className="size-8" /></div>}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {dead
                            ? <p className="font-serif text-lg text-ink/40">Removed sweet</p>
                            : <Link to={`/product/${p.slug || pid}`} className="font-serif text-lg text-maroon hover:underline">{p.name}</Link>}
                          <p className="text-xs text-ink/50">{p.category?.name}{it.weightOption ? ` · ${it.weightOption}` : ''}</p>
                          {dead && <p className="mt-1 text-xs font-semibold text-red-600">No longer available</p>}
                        </div>
                        <button onClick={() => remove(pid, it.weightOption)} disabled={busy === key} aria-label="Remove" className="text-ink/40 transition hover:text-red-600"><Trash2 className="size-4" /></button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        {!dead && (
                          <div className="flex items-center rounded-lg border border-gold/40">
                            <button onClick={() => setQty(pid, it.weightOption, it.quantity - 1)} disabled={busy === key || it.quantity <= 1} className="flex size-8 items-center justify-center text-maroon disabled:opacity-30"><Minus className="size-3.5" /></button>
                            <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                            <button onClick={() => setQty(pid, it.weightOption, it.quantity + 1)} disabled={busy === key || it.quantity >= (p.stock ?? 99)} className="flex size-8 items-center justify-center text-maroon disabled:opacity-30"><Plus className="size-3.5" /></button>
                          </div>
                        )}
                        {!dead && <p className="font-serif text-lg font-semibold text-maroon">{inr(price * it.quantity)}</p>}
                      </div>
                    </div>
                  </div>
                )
              })}
              <button onClick={clear} className="text-xs font-semibold text-ink/50 underline hover:text-red-600">Clear cart</button>
            </div>
            <aside className="h-fit rounded-2xl border border-gold/30 bg-warm-white p-6 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl font-semibold text-maroon">Order summary</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-ink/60">Subtotal ({count} items)</dt><dd className="font-semibold">{inr(cart.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd className="font-semibold text-green-700">Free</dd></div>
                <div className="flex justify-between border-t border-gold/30 pt-2.5"><dt className="font-semibold text-maroon">Total</dt><dd className="font-serif text-lg font-bold text-maroon">{inr(cart.total)}</dd></div>
              </dl>
              {!checkoutOpen ? (
                <button onClick={() => setCheckoutOpen(true)} className="mt-5 w-full rounded-lg bg-maroon py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark">
                  Proceed to checkout
                </button>
              ) : (
                <>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-gold">Shipping address</p>
                  <div className="mt-3 space-y-2">
                    {[['fullName', 'Full name'], ['phone', 'Phone'], ['street', 'Street address'], ['city', 'City'], ['state', 'State'], ['postalCode', 'PIN code']].map(([k, ph]) => (
                      <input key={k} value={form[k]} onChange={set(k)} placeholder={ph} required
                        className="w-full rounded-lg border border-gold/40 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-gold focus:outline-none" />
                    ))}
                  </div>
                  <button onClick={checkout} disabled={ordering || required} className="mt-4 w-full rounded-lg bg-maroon py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark disabled:opacity-50">
                    {ordering ? 'Placing…' : 'Place COD order'}
                  </button>
                </>
              )}
              <p className="mt-3 text-center text-xs text-ink/50">Cash on delivery · Pay when your sweets arrive</p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
export default CartView
