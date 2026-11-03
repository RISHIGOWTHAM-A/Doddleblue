const ProductSort = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}
    className="rounded-lg border border-gold/40 bg-warm-white px-3 py-2.5 text-sm outline-none focus:border-maroon">
    <option value="newest">Sort: Newest</option>
    <option value="price_asc">Price: Low → High</option>
    <option value="price_desc">Price: High → Low</option>
  </select>
)
export default ProductSort
