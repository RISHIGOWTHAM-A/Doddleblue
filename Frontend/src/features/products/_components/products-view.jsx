import { useEffect, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import useProducts from '../_hooks/useProducts'
import useProductFilters from '../_hooks/useProductFilters'
import { getCategories } from '../_api/products.api'
import Header from '../../home/_components/Header'
import Footer from '../../home/_components/Footer'
import ProductGrid, { ProductSkeletons } from './ProductGrid'
import ProductSearch from './ProductSearch'
import ProductSort from './ProductSort'
import ProductFilters from './ProductFilters'

const ProductsView = () => {
  const { apiParams, search, setSearch, set, clearAll, active, params } = useProductFilters()
  const { items, pagination, loading, error } = useProducts(apiParams)
  const [cats, setCats] = useState([])
  const [open, setOpen] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => { getCategories().then(setCats).catch(() => {}) }, [])

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Royal Sweets · Shop</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-maroon">Discover Our Sweets</h1>
        <p className="mt-1 text-sm text-ink/55">Every sweet handmade this morning.{pagination ? ` ${pagination.total} available.` : ''}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ProductSearch value={search} onChange={setSearch} />
          <ProductSort value={params.get('sort') || 'newest'} onChange={(v) => set('sort', v)} />
          <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 rounded-lg border border-gold/40 px-4 py-2.5 text-sm font-medium text-maroon lg:hidden">
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>
        {active.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {active.map((k) => (
              <span key={k} className="flex items-center gap-1.5 rounded-lg bg-gold/20 px-3 py-1 text-xs font-medium text-maroon">
                {k}: {params.get(k)} <button onClick={() => set(k, '')}><X className="size-3" /></button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs font-semibold text-maroon underline">Clear all</button>
          </div>
        )}
        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className={`${open ? 'block' : 'hidden'} lg:block`}>
            <div className="rounded-2xl border border-gold/30 bg-warm-white p-5 lg:sticky lg:top-28">
              <ProductFilters categories={cats} params={params} set={set} />
            </div>
          </aside>
          <div>
            {loading ? <ProductSkeletons /> : error ? (
              <div className="py-20 text-center">
                <p className="text-sm text-ink/60">{error}</p>
                <button onClick={() => setRetry((r) => r + 1)} className="mt-4 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark">Try again</button>
                <span className="hidden">{retry}</span>
              </div>
            ) : items.length === 0 ? (
              <p className="py-20 text-center text-sm text-ink/50">No sweets found — try clearing your filters.</p>
            ) : (
              <ProductGrid products={items} />
            )}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                  <button key={i} onClick={() => set('page', i + 1)} className={`size-9 rounded-lg text-sm font-semibold ${Number(params.get('page') || 1) === i + 1 ? 'bg-maroon text-cream' : 'border border-gold/40 text-maroon'}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default ProductsView
