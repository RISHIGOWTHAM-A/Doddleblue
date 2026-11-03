import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupApi } from '../_api/signup.api'
import { signupSchema } from '../_validation/signup.schema'
import { saveSession } from '../../../api/apiClient'

const initial = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  profileImage: '',
}

export const useSignup = () => {
  const [form, setForm] = useState(initial)
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

    const parsed = signupSchema.safeParse(form)
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
      const { name, email, password, profileImage } = parsed.data
      const res = await signupApi({ name, email, password, profileImage })
      saveSession(res.data.token, res.data.user)
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, fieldErrors, onChange, onSubmit }
}
