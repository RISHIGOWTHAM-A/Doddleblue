import { Link } from 'react-router-dom'
import { ArrowRight, Award, Leaf, Truck } from 'lucide-react'
import { getStoredUser } from '../../../api/apiClient'
import Header from './Header'
import Footer from './Footer'
import ProductGrid, { ProductSkeletons } from '../../products/_components/ProductGrid'
import useHomeData from '../_hooks/useHomeData'

const HERO = 'https://deliciouskart.com/cdn/shop/articles/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpg?v=1792211479&width=2000'

const Section = ({ title, link, children }) => (
  <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
    <div className="mb-6 flex items-end justify-between">
      <h2 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">{title}</h2>
      {link && <Link to={link} className="text-sm font-semibold text-maroon hover:underline">View all →</Link>}
    </div>
    {children}
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
        <img src={HERO} alt="" className="absolute inset-0 size-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 bg-linear-to-r from-maroon-dark/80 via-maroon/45 to-maroon/15" />
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
        <Section title="Shop by category" link="/categories">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link key={c._id} to={`/products?category=${c.slug}`} className="group min-w-36 rounded-2xl border border-gold/30 bg-warm-white px-5 py-5 text-center transition hover:border-gold hover:shadow-lg hover:shadow-maroon/10">
                <p className="font-serif text-lg text-maroon group-hover:underline">{c.name}</p>
                {c.description && <p className="mt-1 line-clamp-1 text-xs text-ink/50">{c.description}</p>}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <Section title="Featured sweets" link="/products">
          <ProductGrid products={featured.slice(0, 8)} />
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
      <Section title="Most loved" link="/products">
        {loading ? <ProductSkeletons count={4} /> : <ProductGrid products={showBest} />}
      </Section>

      {/* All products */}
      <Section title="Our sweets" link="/products">
        {loading ? <ProductSkeletons /> : error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-ink/60">{error}</p>
            <button onClick={reload} className="mt-4 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark">Try again</button>
          </div>
        ) : products.length === 0 ? (
          <p className="py-16 text-center text-sm text-ink/50">No sweets available yet — check back soon.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </Section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Award, t: 'Authentic recipes', d: 'Recipes handed down through generations, made with pure ghee.' },
            { icon: Leaf, t: 'Fresh ingredients', d: 'Prepared daily in small batches — no shortcuts, no preservatives.' },
            { icon: Truck, t: 'Doorstep delivery', d: 'Carefully packed and delivered fresh, with cash on delivery.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-gold/30 bg-warm-white p-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-maroon text-gold"><Icon className="size-5" /></span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-maroon">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomeView
