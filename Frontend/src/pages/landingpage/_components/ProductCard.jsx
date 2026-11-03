import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 bg-cream-dark transition duration-300 group-hover:border-gold/70 group-hover:shadow-xl group-hover:shadow-maroon/10">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="aspect-[4/4.6] w-full object-cover transition duration-700 group-hover:scale-110"
        />
        {product.label && (
          <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-maroon px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream">
            {product.label}
          </span>
        )}
        {/* Price tag */}
        <span className="absolute bottom-4 left-4 rounded-full bg-gold px-3.5 py-1.5 text-sm font-bold text-maroon shadow-md">
          {product.price}
        </span>
        <button
          type="button"
          aria-label={`Add ${product.name} to bag`}
          onClick={() => navigate('/login')}
          className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-cream text-maroon shadow-md transition hover:bg-maroon hover:text-cream"
        >
          <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeWidth="1.7" />
          </svg>
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="font-serif text-xl text-maroon">{product.name}</h3>
          <p className="mt-1 text-sm text-ink/60">{product.description}</p>
        </div>
        <div className="shrink-0 pt-1 text-right">
          <p className="font-serif text-lg font-semibold text-maroon">{product.price}</p>
          <p className="text-xs text-ink/40 line-through">{product.mrp}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-ink/60">
          <span aria-label="5 out of 5 stars" className="tracking-[0.12em] text-gold">
            ★★★★★
          </span>
          ({product.reviews})
        </span>
        <span className="font-semibold uppercase tracking-widest text-gold">
          {product.sold}
        </span>
      </div>
    </article>
  )
}

export default ProductCard
