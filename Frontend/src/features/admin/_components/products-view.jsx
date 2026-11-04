import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { getProducts } from '../../../api/products.api'
import { getCategories } from '../../../api/categories.api'
import { adminCreateProduct, adminDeleteProduct, adminUpdateProduct } from '../_api/products.api'
import { toast } from '../../../components/toast'
import ProductForm from './ProductForm'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const AdminProductsPage = () => {
  const [items, setItems] = useState(null)
  const [cats, setCats] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [notice, setNotice] = useState('')
  const [err, setErr] = useState('')

  const load = async () => {
    const [p, c] = await Promise.all([getProducts({ limit: 100 }), getCategories().catch(() => [])])
    setItems(p.items); setCats(c)
  }

  useEffect(() => {
    const init = async () => { await load() }
    init()
  }, [])

  const save = async (body) => {
    try {
      editing ? await adminUpdateProduct(editing._id, body) : await adminCreateProduct(body)
      setShowForm(false); setEditing(null); toast(editing ? 'Product updated ✓' : 'Product created ✓'); load()
    } catch (e) { toast(e.message, 'error') }
  }
  const del = async (p) => {
    if (!confirm(`Delete ${p.name}?`)) return
    await adminDeleteProduct(p._id); load()
  }

  if (!items) return <p className="py-32 text-center text-sm text-ink/50">Loading…</p>
  return (
    <div>
      <div className="mx-auto max-w-6xl">
        
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-semibold text-maroon">Products</h1>
          <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-2 rounded-lg bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-dark"><Plus className="size-4" /> Add product</button>
        </div>
        {notice && <p className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-800">{notice}</p>}
        {err && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">{err}</p>}
        {showForm && <ProductForm categories={cats} initial={editing} onSave={save} onCancel={() => { setShowForm(false); setEditing(null) }} />}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/30 bg-warm-white">
          <table className="w-full min-w-160 text-sm">
            <thead><tr className="border-b border-gold/25 text-left text-xs uppercase tracking-wider text-ink/50">
              <th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4" /></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-b border-gold/15 last:border-0">
                  <td className="flex items-center gap-3 p-4">
                    {p.images?.[0]?.url && <img src={p.images[0].url} alt="" className="size-10 rounded-lg object-cover" />}
                    <b className="text-maroon">{p.name}</b>{p.isFeatured && <span className="rounded bg-gold/25 px-1.5 py-0.5 text-[10px] font-bold text-maroon">★</span>}</td>
                  <td className="p-4 text-ink/60">{p.category?.name || '—'}</td>
                  <td className="p-4">{inr(p.discountPrice ?? p.price)}{p.discountPrice && <span className="ml-1 text-xs text-ink/40 line-through">{inr(p.price)}</span>}</td>
                  <td className={`p-4 font-semibold ${p.stock === 0 ? 'text-red-600' : 'text-maroon'}`}>{p.stock}</td>
                  <td className="p-4"><span className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>{p.isActive ? 'Active' : 'Hidden'}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setEditing(p); setShowForm(true) }} className="mr-1 rounded-lg p-2 text-maroon hover:bg-maroon/10"><Pencil className="size-4" /></button>
                    <button onClick={() => del(p)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="p-10 text-center text-sm text-ink/50">No products yet — add your first sweet.</p>}
        </div>
      </div>
    </div>
  )
}
export default AdminProductsPage
