import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImageIcon, Minus, Plus, Star } from 'lucide-react'
import { addToCart } from '../_api/products.api'
import { getCart, removeCartItem, updateCartItem } from '../../../api/cart.api'
import { getToken } from '../../../api/apiClient'
import { toast } from '../../../components/toast'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const ProductCard = ({ p, variant }) => {
  const navigate = useNavigate()
  const [qty, setQty] = useState(0)
  const [busy, setBusy] = useState(false)
  const img = p.images?.[0]?.url
  const off = p.discountPrice && p.discountPrice < p.price
  const pct = off ? Math.round((1 - p.discountPrice / p.price) * 100) : 0
  const out = p.stock === 0
  const low = !out && p.stock <= 3

  useEffect(() => {
    if (!getToken()) return
    getCart().then((c) => {
      const it = (c?.items || []).find((i) => (i.product?._id || i.product) === p._id)
      if (it) setQty(it.quantity)
    }).catch(() => {})
  }, [p._id])

  const add = async (e, n) => {
    e.preventDefault()
    if (!getToken()) return navigate('/login')
    setBusy(true)
    try {
      const weightOption = p.weightOptions?.length
        ? (p.weightOptions.find((w) => w.stock > 0) || p.weightOptions[0])?.label
        : undefined
      if (n < 0 && qty === 1) {
        await removeCartItem(p._id, weightOption)
        setQty(0); toast(`${p.name} removed`)
      } else if (n < 0) {
        await updateCartItem({ productId: p._id, weightOption, quantity: qty - 1 })
        setQty((q) => q - 1)
      } else {
        await addToCart({ productId: p._id, quantity: n, weightOption })
        setQty((q) => q + n); toast(`${p.name} added to bag`)
      }
    } catch (e2) { toast(e2.message, 'error') }
    setBusy(false)
  }

  if (variant === 'arch') return (
    <div className="group">
      <Link to={`/product/${p.slug || p._id}`} className="relative block overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 bg-cream-dark transition group-hover:shadow-xl group-hover:shadow-maroon/10">
        {img ? <img src={img} alt={p.name} loading="lazy" className="aspect-[4/4.6] w-full object-cover transition duration-700 group-hover:scale-110" />
          : <div className="flex aspect-[4/4.6] items-center justify-center text-ink/20"><ImageIcon className="size-10" /></div>}
        {p.isFeatured && <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-maroon px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream">Bestseller</span>}
        <span className="absolute bottom-4 left-4 rounded-full bg-gold px-3.5 py-1.5 text-sm font-bold text-maroon shadow-md">{inr(p.discountPrice ?? p.price)}</span>
        <button onClick={(e) => add(e, 1)} disabled={busy || out} aria-label={`Add ${p.name}`}
          className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-cream text-maroon shadow-md transition hover:bg-maroon hover:text-cream disabled:opacity-40">
          <Plus className="size-5" />
        </button>
      </Link>
      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <div>
          <h3 className="font-serif text-xl text-maroon">{p.name}</h3>
          {p.description && <p className="mt-1 line-clamp-2 text-sm text-ink/60">{p.description}</p>}
        </div>
        <div className="shrink-0 pt-1 text-right">
          <p className="font-serif text-lg font-semibold text-maroon">{inr(p.discountPrice ?? p.price)}</p>
          {off && <p className="text-xs text-ink/40 line-through">{inr(p.price)}</p>}
        </div>
      </div>
      {p.ratingsCount > 0 && (
        <div className="mt-2 flex items-center justify-between px-1 text-xs">
          <span className="flex items-center gap-1.5 text-ink/60">
            <span className="tracking-[0.12em] text-gold">{'★'.repeat(Math.round(p.ratingsAverage))}</span>({p.ratingsCount})
          </span>
          <span className="font-semibold uppercase tracking-widest text-gold">{p.ratingsCount >= 1000 ? `${(p.ratingsCount / 1000).toFixed(1)}k+` : `${p.ratingsCount}+`} ordered</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="group flex flex-col rounded-2xl border border-gold/30 bg-warm-white p-3 transition hover:shadow-xl hover:shadow-maroon/10">
      <Link to={`/product/${p.slug || p._id}`} className="relative block overflow-hidden rounded-xl bg-cream-dark">
        {img ? (
          <img src={img} alt={p.name} loading="lazy" className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex aspect-4/3 items-center justify-center text-ink/20"><ImageIcon className="size-10" /></div>
        )}
        {pct > 0 && <span className="absolute left-3 top-3 rounded-lg bg-[#c2410c] px-2 py-1 text-[10px] font-bold text-white">-{pct}%</span>}
        {p.isFeatured && <span className="absolute right-3 top-3 rounded-lg bg-maroon px-2.5 py-1 text-[10px] font-bold text-cream">Featured</span>}
      </Link>
      <div className="flex flex-1 flex-col px-1.5 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink/45">{p.category?.name || 'Sweets'}</p>
        <Link to={`/product/${p.slug || p._id}`} className="mt-0.5 font-sans text-[15px] font-bold leading-snug text-ink hover:text-maroon">{p.name}</Link>
        <div className="mt-1.5 flex items-center gap-1.5">
          {p.ratingsCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-semibold text-ink/70">
              <Star className="size-3.5 fill-gold text-gold" />{p.ratingsAverage.toFixed(1)} <span className="font-normal text-ink/45">({p.ratingsCount})</span>
            </span>
          )}
          {low && <span className="text-xs font-semibold text-[#c2410c]">Only {p.stock} left</span>}
          {out && <span className="text-xs font-semibold text-red-600">Out of stock</span>}
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">{inr(p.discountPrice ?? p.price)}</span>
          {off && <span className="text-xs text-ink/40 line-through">{inr(p.price)}</span>}
        </div>
        <div className="mt-auto pt-3">
          {qty > 0 ? (
            <div className="flex items-center justify-between rounded-lg border border-maroon bg-maroon/5">
              <button onClick={(e) => add(e, -1)} disabled={busy} className="flex size-9 items-center justify-center text-maroon"><Minus className="size-4" /></button>
              <span className="text-sm font-bold text-maroon">{qty} in cart</span>
              <button onClick={(e) => add(e, 1)} disabled={busy || out} className="flex size-9 items-center justify-center text-maroon"><Plus className="size-4" /></button>
            </div>
          ) : (
            <button onClick={(e) => add(e, 1)} disabled={busy || out}
              className="w-full rounded-lg bg-maroon py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-50">
              {out ? 'Out of stock' : 'Add to cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductCard
