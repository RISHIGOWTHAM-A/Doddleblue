import { Outlet } from 'react-router-dom'
import { RequireAdmin } from '../../../components/require-permission'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => (
  <RequireAdmin>
    <div className="flex min-h-svh bg-cream">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8"><Outlet /></main>
    </div>
  </RequireAdmin>
)
export default AdminLayout
