import { RequireCustomer } from '../../components/require-permission'
import CartView from './_components/cart-view'

const CartPage = () => (
  <RequireCustomer adminHref="/admin">
    <CartView />
  </RequireCustomer>
)
export default CartPage
