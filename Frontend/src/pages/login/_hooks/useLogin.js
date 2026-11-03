import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../_api/login.api'
import { loginSchema } from '../_validation/login.schema'
import { saveSession } from '../../../lib/apiClient'

export const useLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setError('')
    setFieldErrors((fe) => ({ ...fe, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const parsed = loginSchema.safeParse(form)
    if (!parsed.success) {
      const errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (!errors[key]) errors[key] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setLoading(true)
    try {
      const res = await loginApi(parsed.data)
      saveSession(res.data.token, res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, fieldErrors, onChange, onSubmit }
}
