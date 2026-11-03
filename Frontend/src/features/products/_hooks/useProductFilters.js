import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useProductFilters = () => {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')

  const set = (k, v) => setParams((p) => {
    const n = new URLSearchParams(p)
    v ? n.set(k, v) : n.delete(k)
    if (k !== 'page') n.delete('page')
    return n
  })

  useEffect(() => {
    const t = setTimeout(() => { if (search !== (params.get('search') || '')) set('search', search) }, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const apiParams = {
    search: params.get('search') || undefined,
    category: params.get('category') || undefined,
    minPrice: params.get('minPrice') || undefined,
    maxPrice: params.get('maxPrice') || undefined,
    sort: params.get('sort') || 'newest',
    featured: params.get('featured') || undefined,
    page: params.get('page') || 1,
    limit: 12,
  }
  const clearAll = () => { setSearch(''); setParams({}) }
  const active = [...params.keys()].filter((k) => k !== 'page' && k !== 'sort' && params.get(k))

  return { apiParams, search, setSearch, set, clearAll, active, params }
}
export default useProductFilters
