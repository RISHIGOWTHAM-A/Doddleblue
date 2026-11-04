import { useEffect, useState } from 'react'
import { Mail, Send, Trash2 } from 'lucide-react'
import { apiFetch } from '../../../api/apiClient'
import { toast } from '../../../components/toast'

const dt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const MessagesView = () => {
  const [msgs, setMsgs] = useState(null)
  const [replyTo, setReplyTo] = useState(null)
  const [reply, setReply] = useState('')
  const send = async () => {
    if (!reply.trim()) return
    try { await apiFetch(`/contact/${replyTo}/reply`, { method: 'PUT', body: { reply } }); toast('Reply sent'); setReplyTo(null); setReply(''); load() }
    catch (e) { toast(e.message, 'error') }
  }
  const load = () => apiFetch('/contact').then((r) => setMsgs(r.data)).catch((e) => { toast(e.message, 'error'); setMsgs([]) })
  useEffect(() => { load() }, [])

  const read = async (id) => { try { await apiFetch(`/contact/${id}/read`, { method: 'PUT' }); load() } catch (e) { toast(e.message, 'error') } }
  const del = async (id) => { try { await apiFetch(`/contact/${id}`, { method: 'DELETE' }); toast('Deleted'); load() } catch (e) { toast(e.message, 'error') } }

  if (!msgs) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Messages</h1>
      <p className="mt-1 text-sm text-ink/55">Customer enquiries from the contact page — {msgs.filter((m) => !m.isRead).length} unread</p>
      <div className="mt-6 space-y-3">
        {msgs.map((m) => (
          <div key={m._id} className={`rounded-2xl border p-5 transition ${m.isRead ? 'border-gold/20 bg-warm-white/60' : 'border-gold/50 bg-warm-white shadow-sm'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <b className="font-serif text-maroon">{m.name}</b>
                  <span className="text-xs text-ink/50">{m.email}</span>
                  {!m.isRead && <span className="rounded bg-gold/25 px-1.5 py-0.5 text-[10px] font-bold text-maroon">NEW</span>}
                </div>
                {m.subject && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{m.subject}</p>}
                <p className="mt-2 text-sm leading-6 text-ink/75">{m.message}</p>
                {m.reply && (
                  <p className="mt-3 rounded-lg border-l-4 border-gold bg-gold/10 px-4 py-2.5 text-sm leading-6 text-maroon">
                    <b className="text-xs font-bold uppercase tracking-wider text-gold">Admin reply</b><br />{m.reply}
                  </p>
                )}
                <p className="mt-2 text-xs text-ink/40">{dt(m.createdAt)}</p>
                {replyTo === m._id ? (
                  <div className="mt-3 flex gap-2">
                    <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…" autoFocus
                      className="flex-1 rounded-lg border border-gold/40 bg-cream px-3 py-2 text-sm outline-none focus:border-maroon" />
                    <button onClick={send} className="flex items-center gap-1.5 rounded-lg bg-maroon px-4 py-2 text-xs font-semibold text-cream hover:bg-maroon-dark"><Send className="size-3.5" /> Send</button>
                  </div>
                ) : (
                  <button onClick={() => { setReplyTo(m._id); setReply(m.reply || '') }} className="mt-3 text-xs font-semibold text-maroon underline">
                    {m.reply ? 'Edit reply' : 'Reply'}
                  </button>
                )}
              </div>
              <span className="flex shrink-0 gap-1">
                {!m.isRead && <button onClick={() => read(m._id)} title="Mark read" className="rounded-lg p-2 text-maroon hover:bg-maroon/10"><Mail className="size-4" /></button>}
                <button onClick={() => del(m._id)} title="Delete" className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>
              </span>
            </div>
          </div>
        ))}
        {msgs.length === 0 && <p className="py-14 text-center text-sm text-ink/50">No messages yet.</p>}
      </div>
    </div>
  )
}
export default MessagesView
