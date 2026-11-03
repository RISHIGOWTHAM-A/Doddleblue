import { Navigate, useLocation } from 'react-router-dom'
import { getStoredUser, getToken } from '../api/apiClient'

export const RequireCustomer = ({ children, adminHref = '/admin' }) => {
  const location = useLocation()
  const user = getStoredUser()
  if (!getToken()) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (user?.role === 'admin') return <Navigate to={adminHref} replace />
  return children
}

export const RequireAdmin = ({ children, customerHref = '/home' }) => {
  const user = getStoredUser()
  if (!getToken()) return <Navigate to="/login" replace />
  if (user?.role !== 'admin') return <Navigate to={customerHref} replace />
  return children
}
