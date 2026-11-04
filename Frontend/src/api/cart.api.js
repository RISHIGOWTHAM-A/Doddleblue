import { apiFetch } from './apiClient'
import { store } from '../store'
import { bumpCount, fetchCart } from '../store/cartSlice'

const sync = async (...a) => {
  const r = await apiFetch(...a)
  store.dispatch(fetchCart())
  return r
}

export const getCart = async () => (await apiFetch('/cart')).data
export const addToCart = (body) => {
  store.dispatch(bumpCount(body?.quantity || 1))
  return sync('/cart/items', { method: 'POST', body })
}
export const updateCartItem = (body) => sync('/cart/items', { method: 'PUT', body })
export const removeCartItem = (productId, weightOption) =>
  sync(`/cart/items/${productId}${weightOption ? `?weightOption=${encodeURIComponent(weightOption)}` : ''}`, { method: 'DELETE' })
export const clearCart = () => sync('/cart', { method: 'DELETE' })
