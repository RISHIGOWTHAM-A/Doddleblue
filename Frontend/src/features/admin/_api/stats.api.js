import { apiFetch } from '../../../api/apiClient'

export const getStats = () => apiFetch('/admin/stats')

export const logoutApi = () =>
  apiFetch('/auth/logout', { method: 'POST' }).catch(() => {})
