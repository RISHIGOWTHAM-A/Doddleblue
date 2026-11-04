import { apiFetch } from '../../../api/apiClient'

export const getAdminUsers = async () => { const d = (await apiFetch('/admin/users')).data; return d?.users ?? d?.items ?? d ?? [] }
export const deleteAdminUser = (id) => apiFetch(`/admin/users/${id}`, { method: 'DELETE' })
export const getAdminOrders = async () => { const d = (await apiFetch('/admin/orders')).data; return d?.orders ?? d?.items ?? d ?? [] }
export const updateOrderStatus = (id, orderStatus) =>
  apiFetch(`/admin/orders/${id}/status`, { method: 'PUT', body: { status: orderStatus } })
export const createCategory = (body) => apiFetch('/categories', { method: 'POST', body })
export const updateCategory = (id, body) => apiFetch(`/categories/${id}`, { method: 'PUT', body })
export const deleteCategory = (id) => apiFetch(`/categories/${id}`, { method: 'DELETE' })
