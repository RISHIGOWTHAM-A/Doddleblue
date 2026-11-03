import { useEffect, useState } from 'react'
import { getProductById, getProductBySlug, getProducts, getReviews } from '../_api/products.api'

const useProductDetails = (id) => {
  const [s, setS] = useState({ product: null, reviews: [], related: [], loading: true, error: null })
  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const p = await (/^[0-9a-f]{24}$/i.test(id) ? getProductById : getProductBySlug)(id)
        const [reviews, rel] = await Promise.all([
          getReviews(p._id).catch(() => []),
          getProducts({ category: p.category?.slug, limit: 4 }).catch(() => ({ items: [] })),
        ])
        if (alive) setS({ product: p, reviews, related: (rel.items || []).filter((x) => x._id !== p._id), loading: false, error: null })
      } catch (e) { if (alive) setS((x) => ({ ...x, loading: false, error: e.message })) }
    }
    load()
    return () => { alive = false }
  }, [id])
  return s
}
export default useProductDetails
