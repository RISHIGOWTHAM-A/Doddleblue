import ProductDetailsView from './_components/product-details-view'

import { RequireCustomer } from '../../components/require-permission'

const ProductDetailsPage = () => (
  <RequireCustomer adminHref="/admin">
    <ProductDetailsView />
  </RequireCustomer>
)

export default ProductDetailsPage
