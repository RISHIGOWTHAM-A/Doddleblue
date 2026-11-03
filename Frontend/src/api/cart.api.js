import { apiFetch } from './apiClient'

export const getCart = async () => (await apiFetch('/cart')).data
export const addToCart = (body) =>
  apiFetch('/cart/items', { method: 'POST', body: JSON.stringify(body) })
export const updateCartItem = (body) =>
  apiFetch('/cart/items', { method: 'PUT', body: JSON.stringify(body) })
export const removeCartItem = (productId, weightOption) =>
  apiFetch(`/cart/items/${productId}${weightOption ? `?weightOption=${encodeURIComponent(weightOption)}` : ''}`, { method: 'DELETE' })
export const clearCart = () => apiFetch('/cart', { method: 'DELETE' })
