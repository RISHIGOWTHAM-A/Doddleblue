import { Search } from 'lucide-react'

const ProductSearch = ({ value, onChange }) => (
  <div className="relative min-w-52 max-w-md flex-1">
    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search sweets…"
      className="w-full rounded-lg border border-gold/40 bg-warm-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15"
    />
  </div>
)
export default ProductSearch
