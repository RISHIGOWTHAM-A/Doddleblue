import { useEffect, useState } from 'react'
import { getProducts } from '../_api/products.api'

const useProducts = (params) => {
  const [s, setS] = useState({ items: [], pagination: null, loading: true, error: null })
  const key = JSON.stringify(params)
  useEffect(() => {
    let alive = true
    const load = async () => {
      try { const r = await getProducts(params); if (alive) setS({ ...r, loading: false, error: null }) }
      catch (e) { if (alive) setS((x) => ({ ...x, loading: false, error: e.message })) }
    }
    load()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return s
}
export default useProducts
