import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStats, logoutApi } from '../_api/stats.api'
import { clearSession, getStoredUser, getToken } from '../../../api/apiClient'

export const useAdminStats = () => {
  const navigate = useNavigate()
  const [user] = useState(getStoredUser())
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getToken() || user?.role !== 'admin') {
      navigate('/login', { replace: true })
      return
    }
    getStats()
      .then((res) => setStats(res.data))
      .catch((err) => {
        if (err.message?.includes('401')) {
          clearSession()
          navigate('/login', { replace: true })
        } else {
          setError(err.message)
        }
      })
  }, [navigate, user?.role])

  const logout = () => {
    logoutApi()
    clearSession()
    navigate('/')
  }

  return { user, stats, error, logout }
}
