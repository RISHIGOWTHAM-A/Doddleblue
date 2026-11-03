import { Star } from 'lucide-react'
import ProductPrice from './ProductPrice'
import WeightSelector from './WeightSelector'
import ProductQuantity from './ProductQuantity'

const ProductInformation = ({ p, weight, onWeight, qty, onQty }) => {
  const stock = weight?.stock ?? p.stock
  const price = weight?.price ?? p.price
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">{p.category?.name || 'Sweets'}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold text-maroon sm:text-4xl">{p.name}</h1>
      {p.ratingsCount > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
          <Star className="size-4 fill-gold text-gold" />{p.ratingsAverage.toFixed(1)} · {p.ratingsCount} reviews
        </p>
      )}
      <ProductPrice price={price} discountPrice={!weight ? p.discountPrice : undefined} />
      <p className="mt-4 text-sm leading-7 text-ink/70">{p.description}</p>
      <WeightSelector options={p.weightOptions} value={weight} onChange={onWeight} />
      <ProductQuantity qty={qty} setQty={onQty} stock={stock} />
      {(p.ingredients?.length > 0 || p.allergens?.length > 0) && (
        <div className="mt-6 space-y-2 rounded-2xl border border-gold/30 bg-warm-white p-5 text-sm text-ink/70">
          {p.ingredients?.length > 0 && <p><b className="text-maroon">Ingredients:</b> {p.ingredients.join(', ')}</p>}
          {p.allergens?.length > 0 && <p><b className="text-maroon">Allergens:</b> {p.allergens.join(', ')}</p>}
        </div>
      )}
    </div>
  )
}
export default ProductInformation
