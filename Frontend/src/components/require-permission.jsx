import { Navigate, useLocation } from 'react-router-dom'
import { getStoredUser, getToken } from '../api/apiClient'
import { toast } from './toast'

export const RequireCustomer = ({ children, adminHref = '/admin' }) => {
  const location = useLocation()
  const user = getStoredUser()
  if (!getToken()) {
    toast('Please sign in to continue', 'error')
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />
  }
  if (user?.role === 'admin') return <Navigate to={adminHref} replace />
  return children
}

export const RequireAdmin = ({ children, customerHref = '/home' }) => {
  const user = getStoredUser()
  if (!getToken()) {
    toast('Please sign in to continue', 'error')
    return <Navigate to="/login" replace />
  }
  if (user?.role !== 'admin') {
    toast('Admin access only — please sign in as admin', 'error')
    return <Navigate to="/login" replace />
  }
  return children
}
