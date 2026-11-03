import { apiFetch } from '../../../lib/apiClient'

export const loginApi = (credentials) =>
  apiFetch('/auth/login', { method: 'POST', body: credentials, auth: false })
