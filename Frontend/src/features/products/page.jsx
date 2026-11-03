import { RequireCustomer } from '../../components/require-permission'
import ProductsView from './_components/products-view'

const ProductsPage = () => (
  <RequireCustomer adminHref="/admin">
    <ProductsView />
  </RequireCustomer>
)

export default ProductsPage
