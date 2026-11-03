import { apiFetch } from '../../../api/apiClient'

export const getAdminUsers = async () => (await apiFetch('/admin/users')).data?.users ?? []
export const deleteAdminUser = (id) => apiFetch(`/admin/users/${id}`, { method: 'DELETE' })
export const getAdminOrders = async () => (await apiFetch('/admin/orders')).data?.orders ?? []
export const updateOrderStatus = (id, orderStatus) =>
  apiFetch(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ orderStatus }) })
export const createCategory = (body) => apiFetch('/categories', { method: 'POST', body: JSON.stringify(body) })
export const updateCategory = (id, body) => apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) })
export const deleteCategory = (id) => apiFetch(`/categories/${id}`, { method: 'DELETE' })
