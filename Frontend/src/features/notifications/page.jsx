import { useEffect, useState } from 'react'
import { Bell, MessageSquare } from 'lucide-react'
import { apiFetch } from '../../api/apiClient'
import { RequireCustomer } from '../../components/require-permission'
import Header from '../home/_components/Header'
import Footer from '../home/_components/Footer'

const NotificationsView = () => {
  const [replies, setReplies] = useState(null)
  useEffect(() => { apiFetch('/contact/my').then((r) => setReplies(r.data || [])).catch(() => setReplies([])) }, [])
  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Inbox</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-maroon"><span className="text-gold">✦</span> Notifications <span className="text-gold">✦</span></h1>
        </div>
        {!replies ? <div className="mt-10 space-y-4">{[1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-cream-dark" />)}</div>
          : replies.length === 0 ? (
            <div className="py-24 text-center">
              <Bell className="mx-auto size-14 text-gold/50" />
              <p className="mt-4 font-serif text-xl text-maroon/70">No replies yet</p>
              <p className="mt-1 text-sm text-ink/50">When we reply to your contact message, it'll appear here.</p>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {replies.map((r) => (
                <div key={r._id} className="rounded-2xl border border-gold/30 bg-warm-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-maroon text-gold"><MessageSquare className="size-4" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-ink/70"><b className="text-maroon">Your message:</b> {r.message}</p>
                      <p className="mt-3 rounded-lg border-l-4 border-gold bg-gold/10 px-4 py-2.5 text-sm leading-6 text-maroon">
                        <b className="text-[10px] font-bold uppercase tracking-widest text-gold">Royal Sweets replied</b><br />{r.reply}
                      </p>
                      <p className="mt-2 text-xs text-ink/40">{new Date(r.repliedAt || r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>
      <Footer />
    </div>
  )
}
const NotificationsPage = () => <RequireCustomer><NotificationsView /></RequireCustomer>
export default NotificationsPage
