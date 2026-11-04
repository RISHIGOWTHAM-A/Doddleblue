import { Link } from 'react-router-dom'
import { ArrowRight, Award, Leaf, Truck } from 'lucide-react'
import { getStoredUser } from '../../../api/apiClient'
import Header from './Header'
import Footer from './Footer'
import ProductGrid, { ProductSkeletons } from '../../products/_components/ProductGrid'
import ProductCard from '../../products/_components/ProductCard'
import useHomeData from '../_hooks/useHomeData'

const HERO = 'https://deliciouskart.com/cdn/shop/articles/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpg?v=1792211479&width=2000'

const Section = ({ title, link, children }) => (
  <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
    <div className="mb-7 text-center">
      <h2 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">
        <span className="text-gold">✦</span> {title} <span className="text-gold">✦</span>
      </h2>
    </div>
    {children}
    {link && (
      <div className="mt-10 text-center">
        <Link to={link} className="inline-block rounded-full border border-gold/50 bg-warm-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-maroon transition hover:bg-maroon hover:text-cream">View All →</Link>
      </div>
    )}
  </section>
)

const HomeView = () => {
  const user = getStoredUser()
  const { featured, categories, products, loading, error, reload } = useHomeData()

  if (!user) return null
  const best = products.filter((p) => (p.ratingsCount || 0) > 0).sort((a, b) => b.ratingsAverage - a.ratingsAverage).slice(0, 4)
  const showBest = best.length ? best : products.slice(0, 4)

  return (
    <div className="min-h-svh bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-maroon">
        <img src={HERO} alt="" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-r from-maroon-dark/70 via-maroon/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Handcrafted since 1985</p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-cream sm:text-6xl">
            Traditional Indian sweets, made the royal way.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-cream/75">Welcome back, {user.name}. Explore our festive favourites — pure ghee, real saffron, cash on delivery.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-maroon-dark transition hover:brightness-110">Shop Sweets <ArrowRight className="size-4" /></Link>
            <Link to="/categories" className="rounded-lg border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-white/10">Browse Categories</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <Section title="Shop by Category" sub="Pick your favourite kind of sweet">
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
            {categories.map((c) => (
              <Link key={c._id} to={`/products?category=${c.slug}`} className="group flex w-24 flex-col items-center gap-2.5">
                <span className="flex size-20 items-center justify-center overflow-hidden rounded-full border-2 border-gold/40 bg-cream-dark transition group-hover:border-gold group-hover:shadow-lg group-hover:shadow-maroon/15 sm:size-24">
                  {c.image?.url
                    ? <img src={c.image.url} alt={c.name} className="size-full object-cover transition duration-500 group-hover:scale-110" />
                    : <span className="font-serif text-2xl text-maroon/40">{c.name[0]}</span>}
                </span>
                <span className="text-xs font-semibold text-ink/70 transition group-hover:text-maroon">{c.name}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <Section title="Top Picks From our Kitchen" sub="Chosen from our chef's favourites">
          <ProductGrid products={featured.slice(0, 4)} variant="arch" />
        </Section>
      )}

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="rounded-3xl bg-maroon px-8 py-12 text-center sm:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Festive gifting</p>
          <h3 className="mx-auto mt-3 max-w-xl font-serif text-3xl font-semibold text-cream">Sweet boxes for every celebration — cash on delivery available.</h3>
          <Link to="/products" className="mt-6 inline-block rounded-lg bg-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-maroon-dark transition hover:brightness-110">Order Now</Link>
        </div>
      </section>

      {/* Best sellers */}
      {/* Festive gift banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-maroon px-8 py-14 text-center sm:py-16">
          <div className="absolute inset-0 bg-linear-to-r from-maroon-dark/60 via-transparent to-maroon-dark/60" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Festive gifting · Wedding boxes</p>
          <h2 className="relative mx-auto mt-3 max-w-xl font-serif text-3xl font-semibold text-cream sm:text-4xl">Gifts wrapped in gold, filled with sweetness.</h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-cream/70">Hand-packed royal assortments for every celebration — big or small.</p>
          <Link to="/products?category=gift-packs" className="relative mt-7 inline-block rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-maroon-dark transition hover:brightness-110">Explore gift boxes →</Link>
        </div>
      </section>

      {/* Promise bar */}
      <section className="border-y border-gold/25 bg-[#FBF2E2]">
        <div className="mx-auto grid max-w-7xl divide-y divide-gold/25 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
          {[['Made by hand', 'Small batches, every morning'], ['Honest ingredients', 'Pure ghee. No shortcuts.'], ['A gift from the heart', 'Wrapped to make their day']].map(([t, d], i) => (
            <div key={t} className="flex items-center gap-4 py-5 md:justify-center md:py-6">
              <span className="font-serif text-2xl italic text-gold">0{i + 1}</span>
              <div>
                <h2 className="font-serif text-lg text-maroon">{t}</h2>
                <p className="mt-0.5 text-xs text-maroon/65">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Most loved on Royal Sweets</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl">Our Bestselling Sweets</h2>
          <div className="mx-auto mt-3 flex w-24 items-center justify-center gap-2">
            <span className="h-px flex-1 bg-gold/60" /><span className="text-gold">✦</span><span className="h-px flex-1 bg-gold/60" />
          </div>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/55">The boxes people keep coming back for — slow-cooked in small batches and sold out almost every week.</p>
        </div>
        {loading ? <ProductSkeletons count={4} /> : (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
            {showBest.map((p) => <ProductCard key={p._id} p={p} variant="arch" />)}
          </div>
        )}
        <div className="mt-14 text-center">
          <Link to="/products" className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:border-maroon hover:bg-maroon hover:text-cream">
            See all sweets →
          </Link>
        </div>
      </section>

      {products.length === 0 && !loading && (
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          {error ? (
            <div className="py-16 text-center">
              <p className="text-sm text-ink/60">{error}</p>
              <button onClick={reload} className="mt-4 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark">Try again</button>
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-ink/50">No sweets available yet — check back soon.</p>
          )}
        </section>
      )}

      {/* Why Royal Sweets */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Why Royal Sweets</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-maroon sm:text-3xl"><span className="text-gold">✦</span> Crafted with devotion <span className="text-gold">✦</span></h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Award, t: 'Authentic recipes', d: 'Recipes handed down through generations, made with pure ghee.' },
            { icon: Leaf, t: 'Fresh ingredients', d: 'Prepared daily in small batches — no shortcuts, no preservatives.' },
            { icon: Truck, t: 'Doorstep delivery', d: 'Carefully packed and delivered fresh, with cash on delivery.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-warm-white p-8 text-center transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-maroon/10">
              <span className="absolute -right-6 -top-6 size-24 rounded-full bg-gold/10 transition group-hover:scale-125" />
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-maroon text-gold shadow-lg shadow-maroon/25 ring-4 ring-gold/20"><Icon className="size-6" /></span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-maroon">{t}</h3>
              <span className="mx-auto mt-3 block h-0.5 w-10 rounded-full bg-gold/60 transition group-hover:w-16" />
              <p className="mt-3 text-sm leading-6 text-ink/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomeView
