import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { getCategories } from '../../../api/categories.api'
import { createCategory, deleteCategory, updateCategory } from '../_api/admin.api'
import { toast } from '../../../components/toast'

const inp = 'w-full rounded-lg border border-gold/40 bg-warm-white px-4 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15'

const AdminCategoriesPage = () => {
  const [cats, setCats] = useState(null)
  const [edit, setEdit] = useState(null)
  const [f, setF] = useState({ name: '', description: '' })
  const load = () => getCategories().then(setCats).catch(() => setCats([]))
  useEffect(() => { load() }, [])
  const save = async (e) => {
    e.preventDefault()
    try { edit ? await updateCategory(edit._id, f) : await createCategory(f); setF({ name: '', description: '' }); setEdit(null); load() }
    catch (e2) { toast(e2.message, 'error') }
  }
  if (!cats) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Categories</h1>
      <form onSubmit={save} className="mt-6 max-w-2xl space-y-3 rounded-2xl border border-gold/30 bg-warm-white p-5">
        <input className={inp} placeholder={edit ? `Editing: ${edit.name}` : 'New category name'} value={f.name} onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))} required />
        <input className={inp} placeholder="Description" value={f.description} onChange={(e) => setF((x) => ({ ...x, description: e.target.value }))} />
        <div className="flex gap-2">
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-maroon px-5 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark"><Plus className="size-4" />{edit ? 'Update' : 'Add'}</button>
          {edit && <button type="button" onClick={() => { setEdit(null); setF({ name: '', description: '' }) }} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-maroon">Cancel</button>}
        </div>
      </form>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/30 bg-warm-white">
        <table className="w-full min-w-160 text-sm">
          <thead><tr className="border-b border-gold/25 text-left text-xs uppercase tracking-wider text-ink/50">
            <th className="p-4">Category</th><th className="p-4">Slug</th><th className="p-4">Description</th><th className="p-4 text-right">Actions</th>
          </tr></thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c._id} className="border-b border-gold/15 last:border-0">
                <td className="flex items-center gap-3 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 font-serif text-sm font-semibold text-maroon">{c.name[0]}</span>
                  <b className="text-maroon">{c.name}</b></td>
                <td className="p-4"><span className="rounded-lg bg-gold/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-maroon">/{c.slug}</span></td>
                <td className="max-w-md p-4"><p className="line-clamp-1 text-ink/55">{c.description || '—'}</p></td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(c); setF({ name: c.name, description: c.description || '' }) }} className="mr-1 rounded-lg p-2 text-maroon hover:bg-maroon/10"><Pencil className="size-4" /></button>
                  <button onClick={async () => { if (confirm(`Delete ${c.name}?`)) { await deleteCategory(c._id); load() } }} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>
                </td>
              </tr>))}
          </tbody>
        </table>
        {cats.length === 0 && <p className="p-10 text-center text-sm text-ink/50">No categories yet.</p>}
      </div>
    </div>
  )
}
export default AdminCategoriesPage
