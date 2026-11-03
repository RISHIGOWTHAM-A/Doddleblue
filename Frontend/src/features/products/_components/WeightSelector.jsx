const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const WeightSelector = ({ options = [], value, onChange }) => {
  if (!options.length) return null
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-maroon/70">Weight</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const sold = o.stock === 0
          return (
            <button key={o.label} onClick={() => !sold && onChange(o)} disabled={sold}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                value?.label === o.label ? 'bg-maroon text-cream' : 'border border-gold/40 text-maroon hover:bg-maroon/5'}`}>
              {o.label} · {inr(o.price)}{sold && ' — out'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default WeightSelector
