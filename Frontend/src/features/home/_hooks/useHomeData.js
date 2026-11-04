import { useEffect, useState } from 'react'
import { getFeatured, getProducts } from '../../../api/products.api'
import { getCategories } from '../../../api/categories.api'

const useHomeData = () => {
  const [s, setS] = useState({ featured: [], categories: [], products: [], loading: true, error: null })
  const load = async () => {
    try {
      const [featured, categories, products] = await Promise.all([getFeatured(), getCategories(), getProducts({ limit: 48 })])
      setS({ featured, categories, products: products.items, loading: false, error: null })
    } catch (e) { setS((x) => ({ ...x, loading: false, error: e.message })) }
  }
  useEffect(() => { load() }, [])
  return { ...s, reload: load }
}
export default useHomeData
