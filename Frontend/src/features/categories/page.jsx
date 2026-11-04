import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageIcon } from 'lucide-react'
import { getCategories } from '../products/_api/products.api'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const CategoriesPage = () => {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { getCategories().then(setCats).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Pick your favourite kind</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl"><span className="text-gold">✦</span> Shop by Category <span className="text-gold">✦</span></h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-ink/55">From melt-in-mouth milk sweets to crunchy savories — explore our handcrafted collections.</p>
        </div>
        {loading ? (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">{[1, 2, 3, 4].map((i) => <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-cream-dark" />)}</div>
        ) : cats.length === 0 ? (
          <p className="py-20 text-center text-sm text-ink/50">No categories yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {cats.map((c) => (
              <Link key={c._id} to={`/products?category=${c.slug}`} className="group overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 bg-warm-white transition hover:border-gold hover:shadow-xl hover:shadow-maroon/10">
                <div className="overflow-hidden bg-cream-dark">
                  {c.image?.url
                    ? <img src={c.image.url} alt={c.name} className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-110" />
                    : <div className="flex aspect-4/3 items-center justify-center text-ink/20"><ImageIcon className="size-10" /></div>}
                </div>
                <div className="p-5 text-center">
                  <h2 className="font-serif text-lg font-semibold text-maroon group-hover:underline">{c.name}</h2>
                  {c.description && <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/55">{c.description}</p>}
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Browse sweets →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
export default CategoriesPage
