import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import useProductDetails from '../_hooks/useProductDetails'
import Header from '../../home/_components/Header'
import Footer from '../../home/_components/Footer'
import ProductGallery from './ProductGallery'
import ProductInformation from './ProductInformation'
import ProductReviews from './ProductReviews'
import RelatedProducts from './RelatedProducts'
import { getToken } from '../../../api/apiClient'
import { addToCart, getReviews } from '../_api/products.api'
import { toast } from '../../../components/toast'

const ProductDetailsView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product: p, reviews, related, loading, error } = useProductDetails(id)
  const [rev, setRev] = useState(reviews)
  const [qty, setQty] = useState(1)
  const [weight, setWeight] = useState(null)
  const [busy, setBusy] = useState(false)

  const allReviews = rev.length || !reviews.length ? rev : reviews
  const reloadReviews = () => getReviews(p._id).then(setRev).catch(() => {})

  if (loading) return <div className="min-h-svh bg-cream"><Header /><p className="py-32 text-center text-sm text-ink/50">Loading…</p></div>
  if (error || !p) return (
    <div className="min-h-svh bg-cream"><Header />
      <div className="py-32 text-center"><p className="text-sm text-ink/60">{error || 'Sweet not found'}</p>
        <Link to="/home" className="mt-4 inline-block text-sm font-semibold text-maroon underline">Back to home</Link></div>
    </div>
  )

  const w = weight || p.weightOptions?.[0] || null
  const stock = w?.stock ?? p.stock

  const add = async () => {
    if (!getToken()) return navigate('/login')
    setBusy(true)
    try { await addToCart({ productId: p._id, weightOption: w?.label, quantity: qty }); toast(`${p.name} added to bag`) }
    catch (e) { toast(e.message, 'error') }
    setBusy(false)
  }

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <p className="text-xs text-ink/50">
          <Link to="/home" className="text-maroon hover:underline">Home</Link> / <Link to="/products" className="text-maroon hover:underline">{p.category?.name || 'Sweets'}</Link> / <span className="text-ink/70">{p.name}</span>
        </p>
        <div className="mt-5 grid gap-10 lg:grid-cols-2">
          <ProductGallery images={p.images} name={p.name} />
          <div>
            <ProductInformation p={p} weight={w} onWeight={setWeight} qty={qty} onQty={setQty} />
            <button onClick={add} disabled={busy || !stock}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-maroon py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark disabled:opacity-50">
              <ShoppingBag className="size-4" /> {busy ? 'Adding…' : 'Add to bag'}
            </button>
          </div>
        </div>
        <ProductReviews productId={p._id} reviews={allReviews} onAdded={reloadReviews} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </div>
  )
}
export default ProductDetailsView
