import { apiFetch } from './apiClient'

export const placeOrder = (body = {}) =>
  apiFetch('/orders', { method: 'POST', body })
export const getMyOrders = async () => (await apiFetch('/orders/my-orders')).data
export const getMyOrder = async (id) => (await apiFetch(`/orders/${id}`)).data
