import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Toaster from './components/Toaster'
import SessionExpired from './components/SessionExpired'
import { RequireCustomer } from './components/require-permission'
import LandingPage from './pages/landingpage/Page'
import LoginPage from './pages/login/Page'
import SignupPage from './pages/signup/Page'
import AdminPage from './features/admin/Page'
import HomePage from './features/home/Page'
import ProductsPage from './features/products/page'
import CategoriesPage from './features/categories/page'
import AboutPage from './features/about/page'
import ContactPage from './features/contact/page'
import ProductDetailsPage from './features/products/details-page'
import CartPage from './features/cart/page'
import OrdersPage from './features/orders/page'
import AdminProductsPage from './features/admin/products-page'
import AdminLayout from './features/admin/_components/AdminLayout'
import AdminOrdersPage from './features/admin/orders-page'
import AdminCategoriesPage from './features/admin/categories-page'
import AdminCustomersPage from './features/admin/customers-page'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<RequireCustomer><HomePage /></RequireCustomer>} />
      <Route path="/products" element={<RequireCustomer><ProductsPage /></RequireCustomer>} />
      <Route path="/categories" element={<RequireCustomer><CategoriesPage /></RequireCustomer>} />
      <Route path="/about" element={<RequireCustomer><AboutPage /></RequireCustomer>} />
      <Route path="/contact" element={<RequireCustomer><ContactPage /></RequireCustomer>} />
      <Route path="/product/:id" element={<RequireCustomer><ProductDetailsPage /></RequireCustomer>} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Toaster />
    <SessionExpired />
  </BrowserRouter>
)

export default App
