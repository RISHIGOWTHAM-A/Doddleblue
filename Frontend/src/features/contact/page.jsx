import { useEffect, useState } from 'react'
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import { apiFetch, getStoredUser } from '../../api/apiClient'
import { toast } from '../../components/toast'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const inp = 'w-full rounded-lg border border-gold/40 bg-cream px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-maroon'
const lbl = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70'

const ContactPage = () => {
  const user = getStoredUser()
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', subject: '', message: '' })
  const [busy, setBusy] = useState(false)
  const [mine, setMine] = useState([])
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))
  const loadMine = () => apiFetch('/contact/my').then((r) => setMine(r.data || [])).catch(() => {})
  useEffect(() => { loadMine() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await apiFetch('/contact', { method: 'POST', body: f })
      toast('Message sent — we\'ll get back to you soon')
      setF((x) => ({ ...x, subject: '', message: '' })); loadMine()
    } catch (e2) { toast(e2.message, 'error') }
    setBusy(false)
  }

  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main>
        <section className="bg-maroon py-14 text-center text-cream">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">We'd love to hear from you</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-md px-5 text-sm leading-6 text-cream/70">Questions about orders, bulk gifting, or a custom sweet request? Write to us.</p>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <form onSubmit={submit} className="rounded-2xl border border-gold/30 bg-warm-white p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className={lbl}>Name *</span><input className={inp} value={f.name} onChange={set('name')} required /></label>
                <label className="block"><span className={lbl}>Email *</span><input type="email" className={inp} value={f.email} onChange={set('email')} required /></label>
              </div>
              <label className="mt-4 block"><span className={lbl}>Subject</span><input className={inp} value={f.subject} onChange={set('subject')} placeholder="Order help, bulk order…" /></label>
              <label className="mt-4 block"><span className={lbl}>Message *</span><textarea className={inp} rows={6} value={f.message} onChange={set('message')} required placeholder="Tell us what you need…" /></label>
              <button disabled={busy} className="mt-5 flex items-center gap-2 rounded-lg bg-maroon px-7 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition hover:bg-maroon-dark disabled:opacity-50">
                <Send className="size-4" /> {busy ? 'Sending…' : 'Send message'}
              </button>
            </form>
            <div className="space-y-4">
              {[['Visit us', MapPin, '12, Sweet Street, Jayanagar, Bengaluru 560041'], ['Call us', Phone, '+91 98765 43210 · Mon–Sat, 9am–9pm'], ['Write to us', Mail, 'hello@royalsweets.in']].map(([t, Icon, d]) => (
                <div key={t} className="flex gap-4 rounded-2xl border border-gold/30 bg-warm-white p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-maroon text-gold"><Icon className="size-5" /></span>
                  <div><h3 className="font-serif text-lg font-semibold text-maroon">{t}</h3><p className="mt-1 text-sm leading-5 text-ink/60">{d}</p></div>
                </div>
              ))}
              <div className="rounded-2xl border border-gold/30 bg-maroon p-6 text-cream">
                <p className="font-serif text-lg font-semibold">Bulk & wedding orders</p>
                <p className="mt-2 text-sm leading-6 text-cream/70">Need 50+ boxes for a celebration? Mention quantities in your message and we'll call you back.</p>
              </div>
            </div>
          </div>
        </section>
        {mine.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-maroon"><MessageSquare className="size-5 text-gold" /> Your messages</h2>
            <div className="mt-5 space-y-4">
              {mine.map((m) => (
                <div key={m._id} className="rounded-2xl border border-gold/30 bg-warm-white p-5">
                  <p className="text-sm leading-6 text-ink/75">{m.message}</p>
                  <p className="mt-1.5 text-xs text-ink/40">{new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  {m.reply ? (
                    <p className="mt-3 rounded-lg border-l-4 border-gold bg-gold/10 px-4 py-2.5 text-sm leading-6 text-maroon">
                      <b className="text-xs font-bold uppercase tracking-wider text-gold">Royal Sweets replied</b><br />{m.reply}
                    </p>
                  ) : (
                    <p className="mt-3 rounded-lg border border-dashed border-gold/40 bg-cream px-4 py-2.5 text-xs text-ink/55">Waiting for our reply — we'll respond here soon.</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
export default ContactPage
