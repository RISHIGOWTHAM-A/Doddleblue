import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import brandLogo from '../assets/brand-logo.png'

const SessionExpired = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(true)
    window.addEventListener('session-expired', on)
    return () => window.removeEventListener('session-expired', on)
  }, [])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-maroon-dark/85 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-gold/40 bg-warm-white p-10 text-center shadow-2xl">
        <img src={brandLogo} alt="" className="mx-auto size-14 rounded-xl border border-gold/50 object-cover" />
        <span className="mx-auto mt-5 flex size-12 items-center justify-center rounded-full bg-gold/20 text-maroon"><Lock className="size-5" /></span>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-maroon">Session expired</h1>
        <p className="mt-2 text-sm leading-6 text-ink/60">Your sign-in token has expired for security. Please sign in again — we're taking you to the login page.</p>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Redirecting…</p>
      </div>
    </div>
  )
}
export default SessionExpired
