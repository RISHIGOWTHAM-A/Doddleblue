import { useEffect, useState } from 'react'
import { MoreVertical, Pencil, Plus, Trash2, X } from 'lucide-react'
import { getCategories } from '../../../api/categories.api'
import { createCategory, deleteCategory, updateCategory } from '../_api/admin.api'
import { toast } from '../../../components/toast'

const inp = 'w-full rounded-lg border border-gold/40 bg-warm-white px-4 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15'

const AdminCategoriesPage = () => {
  const [cats, setCats] = useState(null)
  const [edit, setEdit] = useState(null)
  const [f, setF] = useState({ name: '', description: '', image: '' })
  const [showForm, setShowForm] = useState(false)
  const [menu, setMenu] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const closeForm = () => { setShowForm(false); setEdit(null); setF({ name: '', description: '', image: '' }) }
  const load = () => getCategories().then(setCats).catch(() => setCats([]))
  useEffect(() => { load() }, [])
  const save = async (e) => {
    e.preventDefault()
    const body = { name: f.name, description: f.description, ...(f.image ? { image: { url: f.image, publicId: `cat/${f.name}` } } : {}) }
    try { edit ? await updateCategory(edit._id, body) : await createCategory(body); closeForm(); load() }
    catch (e2) { toast(e2.message, 'error') }
  }
  if (!cats) return <p className="py-20 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-maroon sm:text-3xl">Categories</h1>
        <button onClick={() => { setEdit(null); setF({ name: '', description: '', image: '' }); setShowForm(true) }} className="flex items-center gap-2 rounded-lg bg-maroon px-5 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark"><Plus className="size-4" /> Add category</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md" onClick={closeForm}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gold/25 px-6 py-4">
              <h2 className="font-serif text-lg font-semibold text-maroon">{edit ? `Edit ${edit.name}` : 'New category'}</h2>
              <button type="button" onClick={closeForm} className="rounded-lg p-1 text-ink/40 transition hover:bg-maroon/10 hover:text-maroon"><X className="size-5" /></button>
            </div>
            <div className="space-y-4 p-6">
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70">Name *</span>
                <input className={inp} placeholder="Category name" value={f.name} onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))} required autoFocus /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70">Description</span>
                <textarea className={inp} rows={3} placeholder="Short description" value={f.description} onChange={(e) => setF((x) => ({ ...x, description: e.target.value }))} /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70">Image URL</span>
                <input className={inp} placeholder="https://… category image" value={f.image} onChange={(e) => setF((x) => ({ ...x, image: e.target.value }))} /></label>
              {f.image && <img src={f.image} alt="" className="h-20 w-full rounded-lg border border-gold/30 object-cover" />}
              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex items-center gap-2 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-dark"><Plus className="size-4" />{edit ? 'Update' : 'Add category'}</button>
                <button type="button" onClick={closeForm} className="rounded-lg border border-gold/50 px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-gold/10">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md" onClick={() => setDeleting(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Trash2 className="mx-auto size-9 text-red-600" />
            <h2 className="mt-3 font-serif text-xl font-semibold text-maroon">Delete {deleting.name}?</h2>
            <p className="mt-1.5 text-sm text-ink/55">Products in this category may be affected.</p>
            <div className="mt-5 flex justify-center gap-3">
              <button onClick={async () => { try { await deleteCategory(deleting._id); toast('Deleted'); load() } catch (e) { toast(e.message, 'error') } setDeleting(null) }} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
              <button onClick={() => setDeleting(null)} className="rounded-lg border border-gold/50 px-6 py-2.5 text-sm font-semibold text-maroon">Cancel</button>
            </div>
          </div>
        </div>
      )}
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
                  <div className="relative inline-block">
                    <button onClick={() => setMenu(menu === c._id ? null : c._id)} className="rounded-lg p-2 text-maroon hover:bg-maroon/10"><MoreVertical className="size-4" /></button>
                    {menu === c._id && (
                      <div className="absolute right-0 z-10 mt-1 w-32 overflow-hidden rounded-xl border border-gold/30 bg-warm-white shadow-lg">
                        <button onClick={() => { setMenu(null); setEdit(c); setF({ name: c.name, description: c.description || '', image: c.image?.url || '' }); setShowForm(true) }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-maroon hover:bg-gold/10"><Pencil className="size-3.5" /> Edit</button>
                        <button onClick={() => { setMenu(null); setDeleting(c) }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"><Trash2 className="size-3.5" /> Delete</button>
                      </div>
                    )}
                  </div>
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
