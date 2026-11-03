import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { getCategories } from '../../../api/categories.api'
import { createCategory, deleteCategory, updateCategory } from '../_api/admin.api'

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
    catch (e2) { alert(e2.message) }
  }
  if (!cats) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Categories</h1>
      <form onSubmit={save} className="mt-6 space-y-3 rounded-2xl border border-gold/30 bg-warm-white p-5">
        <input className={inp} placeholder={edit ? `Editing: ${edit.name}` : 'New category name'} value={f.name} onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))} required />
        <input className={inp} placeholder="Description" value={f.description} onChange={(e) => setF((x) => ({ ...x, description: e.target.value }))} />
        <div className="flex gap-2">
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-maroon px-5 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark"><Plus className="size-4" />{edit ? 'Update' : 'Add'}</button>
          {edit && <button type="button" onClick={() => { setEdit(null); setF({ name: '', description: '' }) }} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-maroon">Cancel</button>}
        </div>
      </form>
      <ul className="mt-6 space-y-2">
        {cats.map((c) => (
          <li key={c._id} className="flex items-center justify-between rounded-xl border border-gold/30 bg-warm-white px-5 py-3.5">
            <div><b className="font-serif text-maroon">{c.name}</b><span className="ml-2 text-xs text-ink/45">/{c.slug}</span></div>
            <span className="flex gap-1">
              <button onClick={() => { setEdit(c); setF({ name: c.name, description: c.description || '' }) }} className="rounded-lg p-2 text-maroon hover:bg-maroon/10"><Pencil className="size-4" /></button>
              <button onClick={async () => { if (confirm(`Delete ${c.name}?`)) { await deleteCategory(c._id); load() } }} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>
            </span>
          </li>))}
      </ul>
    </div>
  )
}
export default AdminCategoriesPage
