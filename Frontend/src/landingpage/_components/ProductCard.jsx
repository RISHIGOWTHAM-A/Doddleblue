function ProductCard({ product, onAdd }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.4rem] bg-[#F0E7D7]">
        <img
          alt={product.imageAlt}
          className="size-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          src={product.image}
        />
        {product.label && (
          <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-maroon">
            {product.label}
          </span>
        )}
        <button
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-cream text-maroon shadow-md transition hover:bg-maroon hover:text-cream"
          onClick={(event) => {
            event.preventDefault()
            window.location.href = '/login'
          }}
          type="button"
        >
          <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeWidth="1.7" />
          </svg>
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="font-serif text-xl text-maroon">{product.name}</h3>
          <p className="mt-1 text-sm text-maroon/65">{product.description}</p>
        </div>
        <p className="shrink-0 pt-1 text-sm font-semibold text-maroon">{product.price}</p>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-maroon/65">
        <span aria-label="5 out of 5 stars" className="tracking-[0.12em] text-gold">★★★★★</span>
        <span>({product.reviews})</span>
      </div>
    </article>
  )
}

export default ProductCard
