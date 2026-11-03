import { Outlet, useNavigate } from 'react-router-dom'
import { getStoredUser, getToken } from '../../../api/apiClient'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  const navigate = useNavigate()
  const user = getStoredUser()
  if (!getToken() || user?.role !== 'admin') { navigate('/login', { replace: true }); return null }
  return (
    <div className="flex min-h-svh bg-cream">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8"><Outlet /></main>
    </div>
  )
}
export default AdminLayout
