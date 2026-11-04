import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteAdminUser, getAdminUsers } from '../_api/admin.api'
import { getStoredUser } from '../../../api/apiClient'

const AdminCustomersPage = () => {
  const [users, setUsers] = useState(null)
  const me = getStoredUser()
  const load = () => getAdminUsers().then(setUsers).catch(() => setUsers([]))
  useEffect(() => { load() }, [])
  if (!users) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Customers</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/30 bg-warm-white">
        <table className="w-full min-w-130 text-sm">
          <thead><tr className="border-b border-gold/25 text-left text-xs uppercase tracking-wider text-ink/50">
            <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4" /></tr></thead>
          <tbody>
            {users.filter((u) => u.role === 'customer').map((u) => (
              <tr key={u._id} className="border-b border-gold/15 last:border-0">
                <td className="flex items-center gap-3 p-4">
                  {u.profileImage ? <img src={u.profileImage} alt="" className="size-9 rounded-lg object-cover" />
                    : <span className="flex size-9 items-center justify-center rounded-lg bg-maroon text-sm font-semibold text-cream">{u.name?.[0]}</span>}
                  <b className="text-maroon">{u.name}</b></td>
                <td className="p-4 text-ink/60">{u.email}</td>
                <td className="p-4"><span className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${u.role === 'admin' ? 'bg-gold/25 text-maroon' : 'bg-maroon/10 text-maroon'}`}>{u.role}</span></td>
                <td className="p-4 text-right">{u._id !== me?._id && (
                  <button onClick={async () => { if (confirm(`Delete ${u.name}? Their cart & reviews are also removed.`)) { await deleteAdminUser(u._id); load() } }} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>)}</td>
              </tr>))}
          </tbody>
        </table>
        {users.length === 0 && <p className="p-10 text-center text-sm text-ink/50">No users found.</p>}
      </div>
    </div>
  )
}
export default AdminCustomersPage
