import { apiFetch } from './apiClient'

const ping = (delta) => window.dispatchEvent(new CustomEvent('cart-updated', { detail: { delta } }))
const mutate = async (...a) => { const r = await apiFetch(...a); ping(); return r }

export const getCart = async () => (await apiFetch('/cart')).data
export const addToCart = async (body) => { ping(body?.quantity || 1); return mutate('/cart/items', { method: 'POST', body }) }
export const updateCartItem = (body) => mutate('/cart/items', { method: 'PUT', body })
export const removeCartItem = (productId, weightOption) =>
  mutate(`/cart/items/${productId}${weightOption ? `?weightOption=${encodeURIComponent(weightOption)}` : ''}`, { method: 'DELETE' })
export const clearCart = () => mutate('/cart', { method: 'DELETE' })
