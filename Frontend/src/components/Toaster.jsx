import { useEffect, useState } from 'react'
import { subscribeToasts } from './toast'

const Toaster = () => {
  const [items, setItems] = useState([])
  useEffect(() => subscribeToasts((t) => {
    setItems((x) => [...x, t])
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== t.id)), 3200)
  }), [])
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 space-y-2">
      {items.map((t) => (
        <div key={t.id} className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${t.type === 'error' ? 'bg-red-600 text-white' : 'bg-maroon text-cream'}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
export default Toaster
