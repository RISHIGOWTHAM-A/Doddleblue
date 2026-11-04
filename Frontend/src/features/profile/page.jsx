import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, LogOut, User } from 'lucide-react'
import { apiFetch, clearSession, getStoredUser } from '../../api/apiClient'
import { RequireCustomer } from '../../components/require-permission'
import { toast } from '../../components/toast'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const inp = 'w-full rounded-lg border border-gold/40 bg-cream px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-maroon'
const lbl = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70'

const ProfileView = () => {
  const navigate = useNavigate()
  const [me, setMe] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', profileImage: '' })
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' })
  const [busy, setBusy] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    apiFetch('/auth/me').then(({ data }) => {
      const u = data?.user ?? data
      setMe(u); setForm({ name: u?.name || '', phone: u?.phone || '', profileImage: u?.profileImage || '' })
    }).catch((e) => toast(e.message, 'error'))
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const saveProfile = async (e) => {
    e.preventDefault()
    setBusy('p')
    try {
      const { data } = await apiFetch('/auth/me', { method: 'PUT', body: form })
      const u = data?.user ?? data
      setMe(u); localStorage.setItem('rs_user', JSON.stringify(u))
      setEditing(false); toast('Profile updated ✓')
    } catch (e2) { toast(e2.message, 'error') }
    setBusy('')
  }

  const savePw = async (e) => {
    e.preventDefault()
    setBusy('w')
    try {
      await apiFetch('/auth/change-password', { method: 'PUT', body: pw })
      setPw({ currentPassword: '', newPassword: '' }); toast('Password changed ✓')
    } catch (e2) { toast(e2.message, 'error') }
    setBusy('')
  }

  const logout = () => {
    apiFetch('/auth/logout', { method: 'POST' }).catch(() => {})
    clearSession(); navigate('/login')
  }

  if (!me) return <div className="min-h-svh bg-cream"><Header /><main className="mx-auto max-w-3xl px-5 py-12"><div className="h-64 animate-pulse rounded-2xl bg-cream-dark" /></main></div>

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="flex items-center gap-5">
          {me.profileImage
            ? <img src={me.profileImage} alt="" className="size-16 rounded-full border-2 border-gold/50 object-cover" />
            : <span className="flex size-16 items-center justify-center rounded-full bg-maroon text-2xl font-serif text-gold"><User className="size-7" /></span>}
          <div>
            <h1 className="font-serif text-3xl font-semibold text-maroon">{me.name}</h1>
            <p className="text-sm text-ink/55">{me.email}</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-8 rounded-2xl border border-gold/30 bg-warm-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-maroon">Profile details</h2>
            {!editing && <button type="button" onClick={() => setEditing(true)} className="rounded-lg border border-maroon/40 px-4 py-1.5 text-xs font-semibold text-maroon transition hover:bg-maroon hover:text-cream">Edit</button>}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={lbl}>Name</span><input className={`${inp} ${!editing ? 'opacity-60' : ''}`} value={form.name} onChange={set('name')} required readOnly={!editing} /></label>
            <label className="block"><span className={lbl}>Phone</span><input className={`${inp} ${!editing ? 'opacity-60' : ''}`} value={form.phone} onChange={set('phone')} placeholder="+91…" readOnly={!editing} /></label>
          </div>
          <label className="mt-4 block"><span className={lbl}>Profile image URL</span><input className={`${inp} ${!editing ? 'opacity-60' : ''}`} value={form.profileImage} onChange={set('profileImage')} placeholder="https://…" readOnly={!editing} /></label>
          {editing && (
            <div className="mt-5 flex gap-3">
              <button disabled={busy === 'p'} className="flex items-center gap-2 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark disabled:opacity-50">
                <Check className="size-4" /> {busy === 'p' ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" onClick={() => { setEditing(false); setForm({ name: me.name || '', phone: me.phone || '', profileImage: me.profileImage || '' }) }} className="rounded-lg border border-gold/50 px-5 py-2.5 text-sm font-semibold text-maroon">Cancel</button>
            </div>
          )}
        </form>

        <form onSubmit={savePw} className="mt-6 rounded-2xl border border-gold/30 bg-warm-white p-6">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-maroon"><Lock className="size-4" /> Change password</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={lbl}>Current</span><input type="password" className={inp} value={pw.currentPassword} onChange={(e) => setPw((p) => ({ ...p, currentPassword: e.target.value }))} required /></label>
            <label className="block"><span className={lbl}>New</span><input type="password" className={inp} value={pw.newPassword} onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))} required minLength={8} /></label>
          </div>
          <button disabled={busy === 'w'} className="mt-5 rounded-lg border border-maroon/40 px-6 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream disabled:opacity-50">
            {busy === 'w' ? 'Changing…' : 'Change password'}
          </button>
        </form>

        <button onClick={logout} className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
          <LogOut className="size-4" /> Sign out
        </button>
      </main>
      <Footer />
    </div>
  )
}

const ProfilePage = () => <RequireCustomer adminHref="/admin"><ProfileView /></RequireCustomer>
export default ProfilePage
