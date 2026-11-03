import ProductCard from './ProductCard'

const RelatedProducts = ({ products }) => {
  if (!products?.length) return null
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-semibold text-maroon">You may also like</h2>
      <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((r) => <ProductCard key={r._id} p={r} />)}
      </div>
    </section>
  )
}
export default RelatedProducts
