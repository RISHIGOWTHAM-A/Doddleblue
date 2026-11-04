import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { getStoredUser, getToken } from '../../../api/apiClient'
import { submitReview } from '../_api/products.api'
import { getMyOrders } from '../../../api/orders.api'
import { toast } from '../../../components/toast'

const ProductReviews = ({ productId, reviews, onAdded }) => {
  const [f, setF] = useState({ rating: 5, comment: '' })
  const [busy, setBusy] = useState(false)
  const [eligible, setEligible] = useState(null)
  const user = getStoredUser()

  useEffect(() => {
    if (!getToken() || user?.role !== 'customer') return
    getMyOrders()
      .then((orders) => {
        const list = Array.isArray(orders) ? orders : orders?.items || []
        setEligible(list.some((o) => ['delivered', 'completed'].includes(o.status) &&
          o.items?.some((i) => (i.product?._id || i.product) === productId)))
      })
      .catch(() => setEligible(false))
  }, [productId])

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try { await submitReview(productId, f); setF({ rating: 5, comment: '' }); toast('Review submitted'); onAdded?.() }
    catch (e2) { toast(e2.message, 'error') }
    setBusy(false)
  }

  return (
    <section className="mt-14">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">
          <span className="text-gold">✦</span> Reviews ({reviews.length}) <span className="text-gold">✦</span>
        </h2>
        <p className="mt-1.5 text-xs italic text-ink/50">What our customers say about this sweet</p>
      </div>
      <div className={`mt-8 grid gap-8 ${reviews.length ? 'lg:grid-cols-[1fr_360px]' : 'justify-center'}`}>
        <ul className={reviews.length ? 'space-y-4' : 'w-full max-w-xl'}>
          {reviews.length === 0 && (
            <li className="rounded-2xl border border-dashed border-gold/50 bg-warm-white px-6 py-12 text-center">
              <p className="font-serif text-lg text-maroon/70">No reviews yet</p>
              <p className="mt-1 text-sm text-ink/50">Order it and be the first to share your experience.</p>
            </li>
          )}
          {reviews.map((r) => (
            <li key={r._id} className="rounded-2xl border border-gold/30 bg-warm-white p-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm">
                  <b className="font-serif text-maroon">{r.customer?.name || 'Customer'}</b>
                  <span className="text-sm text-gold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </p>
              </div>
              {r.comment && <p className="mt-2 text-sm leading-6 text-ink/70">{r.comment}</p>}
            </li>
          ))}
        </ul>
        {getToken() && user?.role === 'customer' && eligible === false && (
          <div className="h-fit rounded-2xl border border-dashed border-gold/50 bg-warm-white p-6 text-center">
            <p className="font-serif text-lg text-maroon">Write a review</p>
            <p className="mt-2 text-sm leading-6 text-ink/55">You can share your experience after this sweet is delivered to you.</p>
          </div>
        )}
        {getToken() && user?.role === 'customer' && eligible && (
          <form onSubmit={submit} className="h-fit rounded-2xl border border-gold/40 bg-warm-white p-6 lg:sticky lg:top-28">
            <p className="font-serif text-lg text-maroon">Write a review</p>
            <div className="mt-3 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setF((x) => ({ ...x, rating: n }))} aria-label={`${n} stars`}>
                  <Star className={`size-7 transition ${n <= f.rating ? 'fill-gold text-gold' : 'text-ink/25 hover:text-gold/50'}`} />
                </button>
              ))}
            </div>
            <textarea value={f.comment} onChange={(e) => setF((x) => ({ ...x, comment: e.target.value }))} placeholder="Share your experience…" rows={3}
              className="mt-4 w-full rounded-lg border border-gold/40 bg-cream px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/40 focus:border-maroon" />
            <button type="submit" disabled={busy} className="mt-4 w-full rounded-lg bg-maroon py-3 text-sm font-semibold uppercase tracking-widest text-cream transition hover:bg-maroon-dark disabled:opacity-50">
              {busy ? 'Submitting…' : 'Submit review'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
export default ProductReviews
