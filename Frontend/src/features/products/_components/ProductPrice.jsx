const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const ProductPrice = ({ price, discountPrice }) => {
  const off = discountPrice && discountPrice < price
  return (
    <p className="mt-4 font-serif text-3xl font-semibold text-maroon">
      {inr(discountPrice ?? price)}
      {off && <><span className="ml-3 text-base text-ink/40 line-through">{inr(price)}</span>
        <span className="ml-2 font-sans text-sm font-semibold text-[#c2410c]">You save {inr(price - discountPrice)} ({Math.round((1 - discountPrice / price) * 100)}%)</span></>}
    </p>
  )
}
export default ProductPrice
