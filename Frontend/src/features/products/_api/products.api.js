import { apiFetch } from '../../../api/apiClient'

const list = (res) => res.data?.products ?? res.data?.items ?? res.data ?? []
const single = (res) => res.data?.product ?? res.data

export const getProducts = async (params = {}) => {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== '')).toString()
  const res = await apiFetch(`/products${qs ? `?${qs}` : ''}`)
  return { items: list(res), pagination: res.data?.pagination }
}

export const getFeatured = async () => list(await apiFetch('/products/featured'))
export const getProductById = async (id) => single(await apiFetch(`/products/${id}`))
export const getProductBySlug = async (slug) => single(await apiFetch(`/products/slug/${slug}`))
export const getReviews = async (id) => list(await apiFetch(`/products/${id}/reviews`))
export const getCategories = async () => {
  const res = await apiFetch('/categories')
  return res.data?.categories ?? res.data?.items ?? res.data ?? []
}
export const submitReview = (productId, body) =>
  apiFetch(`/products/${productId}/reviews`, { method: 'POST', body })
export { addToCart } from '../../../api/cart.api'
