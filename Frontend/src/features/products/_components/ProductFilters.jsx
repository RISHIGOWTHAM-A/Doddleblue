const ProductFilters = ({ categories, params, set }) => (
  <div className="space-y-5">
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-maroon/70">Category</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={() => set('category', '')} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${!params.get('category') ? 'bg-maroon text-cream' : 'border border-gold/40 text-maroon hover:bg-maroon/5'}`}>All</button>
        {categories.map((c) => (
          <button key={c._id} onClick={() => set('category', c.slug)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${params.get('category') === c.slug ? 'bg-maroon text-cream' : 'border border-gold/40 text-maroon hover:bg-maroon/5'}`}>
            {c.name}
          </button>
        ))}
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-maroon/70">Price</p>
      <div className="mt-2 flex items-center gap-2">
        <input type="number" placeholder="Min" defaultValue={params.get('minPrice') || ''} onBlur={(e) => set('minPrice', e.target.value)} className="w-24 rounded-lg border border-gold/40 bg-cream px-3 py-2 text-sm outline-none focus:border-maroon" />
        <span className="text-ink/40">–</span>
        <input type="number" placeholder="Max" defaultValue={params.get('maxPrice') || ''} onBlur={(e) => set('maxPrice', e.target.value)} className="w-24 rounded-lg border border-gold/40 bg-cream px-3 py-2 text-sm outline-none focus:border-maroon" />
      </div>
    </div>
    <label className="flex items-center gap-2 text-sm text-ink/70">
      <input type="checkbox" checked={params.get('featured') === 'true'} onChange={(e) => set('featured', e.target.checked ? 'true' : '')} className="accent-maroon" /> Featured only
    </label>
  </div>
)
export default ProductFilters
