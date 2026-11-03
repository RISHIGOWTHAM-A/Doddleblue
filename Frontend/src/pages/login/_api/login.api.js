import { apiFetch } from '../../../api/apiClient'

export const loginApi = (credentials) =>
  apiFetch('/auth/login', { method: 'POST', body: credentials, auth: false })
