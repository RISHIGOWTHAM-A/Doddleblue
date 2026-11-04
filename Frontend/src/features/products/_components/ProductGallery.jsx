import { useState } from 'react'

const ProductGallery = ({ images = [], name, pct = 0 }) => {
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-cream-dark">
        {pct > 0 && <span className="absolute left-4 top-4 rounded-lg bg-[#c2410c] px-2.5 py-1 text-xs font-bold text-white">-{pct}%</span>}
        {images[idx] ? (
          <img src={images[idx].url} alt={name} className="aspect-square w-full object-cover" />
        ) : (
          <div className="flex aspect-square items-center justify-center font-serif text-6xl text-maroon/25">{name?.[0]}</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((im, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`size-16 overflow-hidden rounded-lg border transition ${i === idx ? 'border-maroon' : 'border-gold/30 hover:border-gold'}`}>
              <img src={im.url} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
export default ProductGallery
