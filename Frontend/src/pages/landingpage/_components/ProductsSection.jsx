import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
import { SectionHeading } from './Decor'

const products = [
  {
    name: 'Coconut Laddu',
    description: 'Soft, toasted coconut & a little cardamom',
    price: '₹420',
    mrp: '₹499',
    sold: '2.4k+ ordered',
    reviews: 128,
    label: 'Bestseller',
    image: 'https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/kalakand-sweet-recipe-festive-fudge-you-can-make-in-under-20-minutes-for-janmashtami/kalakand-sweet-recipe-festive-fudge-you-can-make-in-under-20-minutes-for-janmashtami.webp',
    imageAlt: 'Handmade coconut laddoos served in coconut shells',
  },
  {
    name: 'Kaju Katli',
    description: 'Cashew, cardamom & a little silver leaf',
    price: '₹480',
    mrp: '₹560',
    sold: '1.8k+ ordered',
    reviews: 86,
    image: 'https://www.godavarivantillu.com/cdn/shop/files/download_79b3f355-e772-44c8-bd6b-e1c18d6444ac.png?v=1782302174',
    imageAlt: 'Diamond-shaped kaju katli arranged on a plate',
  },
  {
    name: 'Jalebi',
    description: 'Crisp, golden spirals soaked in syrup',
    price: '₹360',
    mrp: '₹420',
    sold: '3.1k+ ordered',
    reviews: 94,
    image: 'https://media.istockphoto.com/id/523041362/photo/indian-sweets.jpg?s=612x612&w=0&k=20&c=scDx9VW5phPYtB0D5Z6KBxvJ96B8VWC2b1Ckgujf7JE=',
    imageAlt: 'Freshly made golden jalebi spirals',
  },
  {
    name: 'Gulab Jamun',
    description: 'Slow-soaked in our rose-scented syrup',
    price: '₹390',
    mrp: '₹450',
    sold: '2.9k+ ordered',
    reviews: 156,
    label: 'A family favourite',
    image: 'https://images.pexels.com/photos/15014918/pexels-photo-15014918/free-photo-of-bowl-with-gulab-jamun-sweet.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Glossy gulab jamun served in a bowl',
  },
]

const ProductsSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24" id="sweets">
    <Reveal>
      <SectionHeading
        eyebrow="Most loved on Royal Sweets"
        title="Our Bestselling Sweets"
        sub="The boxes people keep coming back for — slow-cooked in small batches and sold out almost every week. Sign in to fill your basket."
      />
    </Reveal>

    <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.name} delay={i * 100}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>

    <Reveal delay={200} className="mt-14 text-center">
      <Link
        to="/signup"
        className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-maroon hover:text-cream hover:border-maroon"
      >
        See all 40+ sweets <span aria-hidden="true">→</span>
      </Link>
    </Reveal>
  </section>
)

export default ProductsSection
