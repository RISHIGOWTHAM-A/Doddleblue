import ProductCard from './ProductCard.jsx'

const products = [
  {
    name: 'Coconut Laddu',
    description: 'Soft, toasted coconut & a little cardamom',
    price: '₹420',
    reviews: 128,
    label: 'Bestseller',
    image: 'https://images.pexels.com/photos/34153206/pexels-photo-34153206/free-photo-of-coconut-laddu-in-coconut-shells-traditional-sweet.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Handmade coconut laddoos served in coconut shells',
  },
  {
    name: 'Kaju Katli',
    description: 'Cashew, cardamom & a little silver leaf',
    price: '₹480',
    reviews: 86,
    image: 'https://images.pexels.com/photos/10514163/pexels-photo-10514163.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Diamond-shaped kaju katli arranged on a plate',
  },
  {
    name: 'Jalebi',
    description: 'Crisp, golden spirals soaked in syrup',
    price: '₹360',
    reviews: 94,
    image: 'https://images.pexels.com/photos/39193443/pexels-photo-39193443/free-photo-of-close-up-of-freshly-made-indian-jalebi-desserts.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Freshly made golden jalebi spirals',
  },
  {
    name: 'Gulab Jamun',
    description: 'Slow-soaked in our rose-scented syrup',
    price: '₹390',
    reviews: 156,
    label: 'A family favourite',
    image: 'https://images.pexels.com/photos/15014918/pexels-photo-15014918/free-photo-of-bowl-with-gulab-jamun-sweet.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Glossy gulab jamun served in a bowl',
  },
]

function ProductsSection({ onAdd }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24" id="sweets">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ochre">A little something for everyone</p>
          <h2 className="font-serif text-4xl tracking-tight text-maroon sm:text-5xl">The sweet favourites</h2>
        </div>
        <a className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-maroon underline decoration-ochre underline-offset-4" href="#gifting">
          See all sweets <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} onAdd={onAdd} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductsSection
