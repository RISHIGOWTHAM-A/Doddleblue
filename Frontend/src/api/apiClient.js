const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getToken = () => localStorage.getItem('rs_token')

export const saveSession = (token, user) => {
  localStorage.setItem('rs_token', token)
  localStorage.setItem('rs_user', JSON.stringify(user))
}

export const clearSession = () => {
  localStorage.removeItem('rs_token')
  localStorage.removeItem('rs_user')
}

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('rs_user'))
  } catch {
    return null
  }
}

export const apiFetch = async (path, { method = 'GET', body, auth = true } = {}) => {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (auth && token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401 && auth) {
    clearSession()
    if (!location.pathname.startsWith('/login')) {
      window.dispatchEvent(new CustomEvent('session-expired', { detail: { from: location.pathname } }))
      setTimeout(() => location.assign(`/login?expired=1&from=${encodeURIComponent(location.pathname)}`), 2500)
    }
    throw new Error('Session expired — please sign in again')
  }
  const json = await res.json().catch(() => ({}))
  console.log(`[API] ${method} ${path} → ${res.status}`)

  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`)
  }
  return json
}
