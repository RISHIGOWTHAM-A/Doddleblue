import { useCallback, useEffect, useState } from 'react'
import { clearCart, getCart, removeCartItem, updateCartItem } from '../../../api/cart.api'
import { toast } from '../../../components/toast'

const useCart = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')

  const load = useCallback(() => {
    setLoading(true); setError('')
    getCart().then(async (c) => {
      const dead = (c?.items || []).filter((i) => i.unavailable === true)
      if (dead.length) {
        for (const i of dead) {
          try { await removeCartItem(i.product?._id || i.product, i.weightOption) } catch { /* best effort */ }
        }
        c = await getCart()
      }
      setCart(c)
    }).catch((e) => setError(e.message)).finally(() => setLoading(false))
  }, [])
  useEffect(load, [load])

  const setQty = async (productId, weightOption, quantity) => {
    const key = `${productId}-${weightOption || ''}`
    setBusy(key)
    try {
      const r = await updateCartItem({ productId, weightOption, quantity })
      setCart(r.data)
    } catch (e) { toast(e.message, 'error') }
    setBusy('')
  }

  const remove = async (productId, weightOption) => {
    const key = `${productId}-${weightOption || ''}`
    setBusy(key)
    try {
      const r = await removeCartItem(productId, weightOption)
      setCart(r.data); toast('Removed from bag')
    } catch (e) { toast(e.message, 'error') }
    setBusy('')
  }

  const clear = async () => {
    try { await clearCart(); setCart({ items: [], subtotal: 0, total: 0 }) }
    catch (e) { toast(e.message, 'error') }
  }

  const count = (cart?.items || []).reduce((n, i) => n + i.quantity, 0)
  return { cart, loading, error, busy, count, reload: load, setQty, remove, clear }
}
export default useCart
