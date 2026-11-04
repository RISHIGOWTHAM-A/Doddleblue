import { Link } from 'react-router-dom'
import { Award, Heart, Leaf, Sparkles, Truck } from 'lucide-react'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const VALUES = [
  { icon: Award, t: 'Authentic recipes', d: 'Handed down through three generations of our family — unchanged since 1985.' },
  { icon: Leaf, t: 'Fresh ingredients', d: 'Pure desi ghee, real saffron and dry fruits sourced daily. No shortcuts, no preservatives.' },
  { icon: Sparkles, t: 'Made by hand', d: 'Small batches every morning in our Bengaluru kitchen — never mass produced.' },
  { icon: Truck, t: 'Doorstep delivery', d: 'Carefully packed in our signature royal boxes and delivered fresh, cash on delivery.' },
]

const AboutPage = () => (
  <div className="min-h-svh bg-cream">
    <Header />
    <main>
      <section className="bg-maroon py-16 text-center text-cream">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Handcrafted since 1985</p>
        <h1 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold sm:text-4xl">The story of Royal Sweets</h1>
        <div className="mx-auto mt-4 flex w-24 items-center justify-center gap-2">
          <span className="h-px flex-1 bg-gold/60" /><span className="text-gold">✦</span><span className="h-px flex-1 bg-gold/60" />
        </div>
        <p className="mx-auto mt-4 max-w-xl px-5 text-sm leading-7 text-cream/75">
          What began as a small family kitchen in Bengaluru is now the city's most-loved mithai house —
          same recipes, same ghee, same love for nearly four decades.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-gold/30 bg-warm-white p-7 text-center transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-maroon/10">
              <span className="mx-auto flex size-13 items-center justify-center rounded-full bg-maroon text-gold shadow-lg shadow-maroon/25 ring-4 ring-gold/20"><Icon className="size-6" /></span>
              <h2 className="mt-4 font-serif text-lg font-semibold text-maroon">{t}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-3xl border border-gold/30 bg-warm-white p-10 text-center">
          <Heart className="mx-auto size-8 fill-gold text-gold" />
          <p className="mx-auto mt-4 max-w-xl font-serif text-xl leading-8 text-maroon">"Every sweet that leaves our kitchen carries a piece of our family with it."</p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ink/50">— The Royal Sweets family</p>
          <Link to="/products" className="mt-7 inline-block rounded-full bg-maroon px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-maroon-dark">Taste the tradition →</Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
)
export default AboutPage
