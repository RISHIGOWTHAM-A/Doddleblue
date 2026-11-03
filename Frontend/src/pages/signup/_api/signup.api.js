import { apiFetch } from '../../../api/apiClient'

export const signupApi = (payload) =>
  apiFetch('/auth/register', { method: 'POST', body: payload, auth: false })
