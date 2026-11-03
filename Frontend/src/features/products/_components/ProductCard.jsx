import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { addToCart } from '../_api/products.api'
import { getToken } from '../../../api/apiClient'
import { toast } from '../../../components/toast'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const ProductCard = ({ p }) => {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const img = p.images?.[0]?.url
  const off = p.discountPrice && p.discountPrice < p.price
  const pct = off ? Math.round((1 - p.discountPrice / p.price) * 100) : 0
  const out = p.stock === 0

  const add = async (e) => {
    e.preventDefault()
    if (!getToken()) return navigate('/login')
    setBusy(true)
    try { await addToCart({ productId: p._id, quantity: 1 }); toast(`${p.name} added to bag`) }
    catch (e2) { toast(e2.message, 'error') }
    setBusy(false)
  }

  return (
    <div className="group">
      <Link to={`/product/${p.slug || p._id}`} className="relative block overflow-hidden rounded-2xl border border-gold/30 bg-cream-dark transition group-hover:shadow-xl group-hover:shadow-maroon/10">
        {img ? (
          <img src={img} alt={p.name} loading="lazy" className="aspect-[4/3.6] w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex aspect-[4/3.6] items-center justify-center font-serif text-5xl text-maroon/25">{p.name?.[0]}</div>
        )}
        {p.isFeatured && <span className="absolute left-3 top-3 rounded-lg bg-maroon px-2.5 py-1 text-[10px] font-bold text-cream">Featured</span>}
        {off && <span className="absolute left-3 top-9 rounded-lg bg-gold px-2.5 py-1 text-[10px] font-bold text-maroon-dark">{pct}% OFF</span>}
        {out && <span className="absolute right-3 top-3 rounded-lg bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">Sold out</span>}
      </Link>
      <div className="mt-3">
        {p.ratingsCount > 0 && (
          <p className="flex items-center gap-1 text-xs font-semibold text-ink/70">
            <Star className="size-3.5 fill-gold text-gold" />{p.ratingsAverage.toFixed(1)} <span className="font-normal text-ink/45">({p.ratingsCount})</span>
          </p>
        )}
        <Link to={`/product/${p.slug || p._id}`} className="mt-0.5 block font-serif text-lg leading-tight text-maroon hover:underline">{p.name}</Link>
        <p className="text-[11px] text-ink/50">{p.category?.name || 'Sweets'}{p.weightOptions?.length ? ` · ${p.weightOptions.length} sizes` : ''}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-serif text-lg font-semibold text-maroon">{inr(p.discountPrice ?? p.price)}</span>
          {off && <span className="text-xs text-ink/40 line-through">{inr(p.price)}</span>}
        </div>
        <div className="mt-2.5 flex gap-2">
          <button onClick={add} disabled={busy || out}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-maroon py-2.5 text-xs font-semibold uppercase tracking-wider text-cream transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-50">
            <ShoppingCart className="size-3.5" /> {out ? 'Sold out' : 'Add to Cart'}
          </button>
          <Link to={`/product/${p.slug || p._id}`} className="rounded-lg border border-gold/50 px-3 py-2.5 text-xs font-semibold text-maroon transition hover:bg-maroon hover:text-cream">View</Link>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
