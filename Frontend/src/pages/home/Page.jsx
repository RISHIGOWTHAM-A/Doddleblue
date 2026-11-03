import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import brandLogo from '../../assets/brand-logo.png'
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
    <div className="min-h-svh bg-cream">
      {/* Top bar */}
      <header className="border-b border-gold/30 bg-cream/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img src={brandLogo} alt="Royal Sweets" className="w-10 h-10 rounded-xl shadow-sm shadow-maroon/20" />
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold tracking-wide text-maroon">ROYAL SWEETS</span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-gold">Est. 1985</span>
            </span>
          </div>
          <button
            onClick={logout}
            className="rounded-full bg-maroon px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        {/* Welcome card */}
        <div className="rounded-3xl border border-gold/30 bg-white/60 p-8 text-center sm:p-10">
          <div className="mx-auto flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-gold/60 bg-cream-dark">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} className="size-full object-cover" />
            ) : (
              <span className="font-serif text-4xl text-maroon">{user.name?.[0]?.toUpperCase()}</span>
            )}
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Welcome back
          </p>
          <h1 className="mt-2 font-serif text-3xl text-maroon sm:text-4xl">{user.name}</h1>
          <p className="mt-1.5 text-sm text-ink/60">{user.email}</p>

          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
            <span className="h-px w-14 bg-gold" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-14 bg-gold" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#sweets"
              className="inline-flex items-center gap-3 rounded-full bg-maroon px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark"
            >
              Browse Sweets <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-maroon hover:text-cream hover:border-maroon"
            >
              Store Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
