import { apiFetch } from '../../../lib/apiClient'

export const signupApi = (payload) =>
  apiFetch('/auth/register', { method: 'POST', body: payload, auth: false })
