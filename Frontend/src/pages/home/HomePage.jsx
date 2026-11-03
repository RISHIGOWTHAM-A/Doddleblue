import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, clearSession, getStoredUser, getToken } from '../../lib/apiClient'

const HomePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser())

  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true })
      return
    }
    apiFetch('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        clearSession()
        navigate('/login', { replace: true })
      })
  }, [navigate])

  const logout = () => {
    apiFetch('/auth/logout', { method: 'POST' }).catch(() => {})
    clearSession()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-svh bg-cream flex items-center justify-center px-4">
      <div className="bg-white/70 border border-gold/30 rounded-2xl shadow-xl shadow-maroon/10 p-10 text-center max-w-sm w-full">
        <div className="w-24 h-24 rounded-full mx-auto bg-cream-dark border-2 border-gold/60 overflow-hidden flex items-center justify-center">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif text-4xl text-maroon">{user.name?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <h1 className="font-serif text-3xl text-maroon mt-4">{user.name}</h1>
        <p className="text-ink/60 text-sm mt-1">{user.email}</p>
        <span className="inline-block mt-3 text-xs uppercase tracking-widest bg-gold/20 text-maroon border border-gold/40 rounded-full px-3 py-1">
          {user.role}
        </span>
        <button
          onClick={logout}
          className="mt-8 w-full bg-maroon hover:bg-maroon-dark text-cream font-semibold tracking-widest uppercase text-sm rounded-lg py-3 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default HomePage
