import { useState } from 'react'
import { Star } from 'lucide-react'
import { getStoredUser, getToken } from '../../../api/apiClient'
import { submitReview } from '../_api/products.api'
import { toast } from '../../../components/toast'

const ProductReviews = ({ productId, reviews, onAdded }) => {
  const [f, setF] = useState({ rating: 5, comment: '' })
  const [busy, setBusy] = useState(false)
  const user = getStoredUser()

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try { await submitReview(productId, f); setF({ rating: 5, comment: '' }); toast('Review submitted'); onAdded?.() }
    catch (e2) { toast(e2.message, 'error') }
    setBusy(false)
  }

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-semibold text-maroon">Reviews ({reviews.length})</h2>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {reviews.length === 0 && <p className="text-sm text-ink/50">No reviews yet — order it and be the first to share.</p>}
          {reviews.map((r) => (
            <li key={r._id} className="rounded-2xl border border-gold/30 bg-warm-white p-4">
              <p className="flex items-center gap-2 text-sm">
                <span className="text-gold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <b className="text-maroon">{r.customer?.name || 'Customer'}</b>
              </p>
              {r.comment && <p className="mt-1.5 text-sm text-ink/70">{r.comment}</p>}
            </li>
          ))}
        </ul>
        {getToken() && user?.role === 'customer' && (
          <form onSubmit={submit} className="h-fit rounded-2xl border border-gold/30 bg-warm-white p-5">
            <p className="font-serif text-lg text-maroon">Write a review</p>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setF((x) => ({ ...x, rating: n }))} aria-label={`${n} stars`}>
                  <Star className={`size-6 ${n <= f.rating ? 'fill-gold text-gold' : 'text-ink/25'}`} />
                </button>
              ))}
            </div>
            <textarea value={f.comment} onChange={(e) => setF((x) => ({ ...x, comment: e.target.value }))} placeholder="Share your experience…" rows={3}
              className="mt-3 w-full rounded-lg border border-gold/40 bg-cream px-3 py-2 text-sm outline-none focus:border-maroon" />
            <button type="submit" disabled={busy} className="mt-3 w-full rounded-lg bg-maroon py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-dark disabled:opacity-50">
              {busy ? 'Submitting…' : 'Submit review'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
export default ProductReviews
