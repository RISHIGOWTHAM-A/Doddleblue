import { Minus, Plus } from 'lucide-react'

const ProductQuantity = ({ qty, setQty, stock }) => (
  <div className="mt-5 flex items-center gap-4">
    <span className="text-sm text-ink/60">Qty</span>
    <div className="flex items-center gap-3 rounded-lg border border-gold/50 px-3 py-1.5">
      <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="size-4 text-maroon" /></button>
      <span className="w-6 text-center font-semibold">{qty}</span>
      <button onClick={() => setQty((q) => Math.min(stock || 99, q + 1))} aria-label="Increase"><Plus className="size-4 text-maroon" /></button>
    </div>
    <span className={`text-xs font-semibold ${stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
    </span>
  </div>
)
export default ProductQuantity
