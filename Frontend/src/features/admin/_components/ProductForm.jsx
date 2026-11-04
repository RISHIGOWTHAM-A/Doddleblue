import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Required'),
  description: z.string().min(10, 'At least 10 characters'),
  category: z.string().min(1, 'Select a category'),
  price: z.coerce.number().nonnegative(),
  discountPrice: z.coerce.number().nonnegative().optional().or(z.literal('')),
  stock: z.coerce.number().nonnegative(),
  weightOptions: z.string().optional(),
  ingredients: z.string().optional(),
  allergens: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

const inp = 'w-full rounded-lg border border-gold/40 bg-warm-white px-4 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15'
const lbl = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-maroon/70'

const ProductForm = ({ categories, onSave, onCancel, initial }) => {
  
  const [images, setImages] = useState(initial?.images || [])
  const [imgUrl, setImgUrl] = useState('')
  const addUrl = () => {
    const url = imgUrl.trim()
    if (!url || images.some((im) => im.url === url)) return
    setImages((x) => [...x, { url, publicId: `external/${x.length}` }])
    setImgUrl('')
  }
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial ? {
      ...initial,
      category: initial.category?._id || initial.category,
      weightOptions: (initial.weightOptions || []).map((w) => `${w.label}:${w.price}${w.stock != null ? `:${w.stock}` : ''}`).join(', '),
      ingredients: (initial.ingredients || []).join(', '),
      allergens: (initial.allergens || []).join(', '),
    } : { isActive: true, isFeatured: false, stock: 0 },
  })

  const submit = (d) => onSave({
    ...d,
    discountPrice: d.discountPrice === '' ? undefined : d.discountPrice,
    ingredients: d.ingredients ? d.ingredients.split(',').map((s) => s.trim()).filter(Boolean) : [],
    allergens: d.allergens ? d.allergens.split(',').map((s) => s.trim()).filter(Boolean) : [],
    weightOptions: d.weightOptions
      ? d.weightOptions.split(',').map((s) => { const [label, price, stock] = s.split(':'); return { label: label?.trim(), price: Number(price), stock: Number(stock || 0) } }).filter((w) => w.label)
      : [],
    images,
  })

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-5 space-y-4 rounded-2xl border border-gold/30 bg-warm-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className={lbl}>Name *</span><input className={inp} {...register('name')} />{errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}</label>
        <label className="block"><span className={lbl}>Category *</span>
          <select className={inp} {...register('category')}>
            <option value="">Select…</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>{errors.category && <span className="text-xs text-red-600">{errors.category.message}</span>}</label>
      </div>
      <label className="block"><span className={lbl}>Description *</span><textarea rows={3} className={inp} {...register('description')} />{errors.description && <span className="text-xs text-red-600">{errors.description.message}</span>}</label>
      <div className="grid grid-cols-3 gap-4">
        <label className="block"><span className={lbl}>Price ₹ *</span><input type="number" className={inp} {...register('price')} />{errors.price && <span className="text-xs text-red-600">{errors.price.message}</span>}</label>
        <label className="block"><span className={lbl}>Discount ₹</span><input type="number" className={inp} {...register('discountPrice')} />{errors.discountPrice && <span className="text-xs text-red-600">{errors.discountPrice.message}</span>}</label>
        <label className="block"><span className={lbl}>Stock *</span><input type="number" className={inp} {...register('stock')} />{errors.stock && <span className="text-xs text-red-600">{errors.stock.message}</span>}</label>
      </div>
      <label className="block"><span className={lbl}>Weight options (label:price:stock, comma-sep)</span><input className={inp} placeholder="500g:250:10, 1kg:480:5" {...register('weightOptions')} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className={lbl}>Ingredients (comma-sep)</span><input className={inp} placeholder="milk, sugar, ghee" {...register('ingredients')} /></label>
        <label className="block"><span className={lbl}>Allergens (comma-sep)</span><input className={inp} placeholder="dairy, nuts" {...register('allergens')} /></label>
      </div>
      <div className="flex gap-6 text-sm text-ink/70">
        <label className="flex items-center gap-2"><input type="checkbox" {...register('isActive')} className="accent-maroon" /> Active</label>
        <label className="flex items-center gap-2"><input type="checkbox" {...register('isFeatured')} className="accent-maroon" /> Featured</label>
      </div>
      <div>
        <span className={lbl}>Images (URL)</span>
        <div className="flex gap-2">
          <input className={inp} placeholder="https://… image url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          <button type="button" onClick={addUrl} className="shrink-0 rounded-lg bg-maroon px-4 text-sm font-semibold text-cream hover:bg-maroon-dark">Add</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((im, i) => (
            <span key={i} className="relative size-20 overflow-hidden rounded-lg border border-gold/40">
              <img src={im.url} alt="" className="size-full object-cover" />
              <button type="button" onClick={() => setImages((x) => x.filter((y) => y !== im))} className="absolute right-0.5 top-0.5 rounded bg-red-600 p-0.5 text-white"><X className="size-3" /></button>
            </span>
          ))}
        </div>
      </div>
      {err && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-dark disabled:opacity-50">{busy ? 'Saving…' : initial ? 'Update product' : 'Create product'}</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-gold/50 px-6 py-2.5 text-sm font-semibold text-maroon">Cancel</button>
      </div>
    </form>
  )
}
export default ProductForm
