import { useState } from 'react'
import {
  ArrowIcon,
  EyeIcon,
  EyeOffIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from '../../../components/icons'

const inputCls = (invalid) =>
  `w-full rounded-lg border bg-white/60 px-4 py-3 pl-11 text-ink placeholder-ink/45 outline-none transition focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
      : 'border-gold/40 focus:border-maroon focus:ring-maroon/15'
  }`

const Field = ({ icon: Icon, error, right, ...props }) => (
  <div>
    <div className="relative">
      <Icon className="w-4.5 h-4.5 absolute left-4 top-4 text-gold pointer-events-none" />
      <input
        className={`${inputCls(!!error)} ${right ? 'pr-11' : 'pr-4'}`}
        {...props}
      />
      {right}
    </div>
    {error && <p className="text-red-600 text-xs mt-1.5 ml-1">{error}</p>}
  </div>
)

const PasswordToggle = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute right-3.5 top-4 text-ink/40 hover:text-maroon transition"
    aria-label={show ? 'Hide password' : 'Show password'}
  >
    {show ? (
      <EyeOffIcon className="w-4.5 h-4.5" />
    ) : (
      <EyeIcon className="w-4.5 h-4.5" />
    )}
  </button>
)

const SignupForm = ({ form, loading, error, fieldErrors = {}, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field
        icon={UserIcon}
        type="text"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Full Name"
        autoComplete="name"
        error={fieldErrors.name}
      />
      <Field
        icon={MailIcon}
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
        autoComplete="email"
        error={fieldErrors.email}
      />
      <Field
        icon={LockIcon}
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="Password"
        autoComplete="new-password"
        error={fieldErrors.password}
        right={
          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword((s) => !s)}
          />
        }
      />
      <Field
        icon={LockIcon}
        type={showConfirm ? 'text' : 'password'}
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={onChange}
        placeholder="Confirm Password"
        autoComplete="new-password"
        error={fieldErrors.confirmPassword}
        right={
          <PasswordToggle
            show={showConfirm}
            onToggle={() => setShowConfirm((s) => !s)}
          />
        }
      />
      <Field
        icon={LinkIcon}
        type="url"
        name="profileImage"
        value={form.profileImage}
        onChange={onChange}
        placeholder="Profile Image URL (Optional)"
        error={fieldErrors.profileImage}
      />

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
        {loading ? 'Creating account…' : 'Create Account'}
        {!loading && <ArrowIcon className="w-4 h-4" />}
      </button>
    </form>
  )
}

export default SignupForm
