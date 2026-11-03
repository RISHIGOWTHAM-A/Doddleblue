import ProductCard from './ProductCard'

export const ProductSkeletons = ({ count = 8 }) => (
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-[4/3.6] rounded-2xl bg-cream-dark" />
        <div className="mt-3 h-4 w-3/4 rounded bg-cream-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-cream-dark" />
        <div className="mt-3 h-9 rounded-lg bg-cream-dark" />
      </div>
    ))}
  </div>
)

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
    {products.map((p) => <ProductCard key={p._id} p={p} />)}
  </div>
)
export default ProductGrid
