import { useState } from 'react'
import {
  ArrowIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from '../../../components/icons'

const inputCls = (invalid) =>
  `w-full rounded-lg border bg-white/60 px-4 py-3 pl-11 pr-11 text-ink placeholder-ink/45 outline-none transition focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
      : 'border-gold/40 focus:border-maroon focus:ring-maroon/15'
  }`

const FieldError = ({ children }) =>
  children ? (
    <p className="text-red-600 text-xs mt-1.5 ml-1">{children}</p>
  ) : null

const LoginForm = ({ form, loading, error, fieldErrors = {}, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <div className="relative">
          <MailIcon className="w-4.5 h-4.5 absolute left-4 top-4 text-gold pointer-events-none" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className={`${inputCls(!!fieldErrors.email)} pr-4`}
            autoComplete="email"
          />
        </div>
        <FieldError>{fieldErrors.email}</FieldError>
      </div>

      <div>
        <div className="relative">
          <LockIcon className="w-4.5 h-4.5 absolute left-4 top-4 text-gold pointer-events-none" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className={inputCls(!!fieldErrors.password)}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-4 text-ink/40 hover:text-maroon transition"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon className="w-4.5 h-4.5" />
            ) : (
              <EyeIcon className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
        <FieldError>{fieldErrors.password}</FieldError>
      </div>

      <div className="flex items-center justify-between text-sm pt-1">
        <label className="flex items-center gap-2 text-ink/70 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 accent-[#6e1e2b]"
          />
          Remember me
        </label>
        <span className="text-maroon font-medium hover:underline cursor-pointer">
          Forgot password?
        </span>
      </div>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-maroon hover:bg-maroon-dark text-cream font-semibold tracking-[0.2em] uppercase text-sm rounded-lg py-3.5 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? 'Signing in…' : 'Sign In'}
        {!loading && <ArrowIcon className="w-4 h-4" />}
      </button>
    </form>
  )
}

export default LoginForm
