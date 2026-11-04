import { Link, useSearchParams } from 'react-router-dom'
import AuthShell from '../../components/AuthShell'
import LoginForm from './_components/LoginForm'
import { useLogin } from './_hooks/useLogin'

const PANEL_IMAGE =
  'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/6123/applications/6540fb587c9ad5e1e1163228/blogs/pictures/free-featured/original/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpeg'

const LoginPage = () => {
  const login = useLogin()
  const [params] = useSearchParams()
  const expired = params.get('expired') === '1'

  return (
    <AuthShell
      panelImage={PANEL_IMAGE}
      title="Welcome Back"
      subtitle="Sign in to continue to Royal Sweets"
      footer={
        <>
          New to Royal Sweets?{' '}
          <Link to="/signup" className="text-maroon font-semibold hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {expired && (
        <p className="mb-4 rounded-lg border border-gold/50 bg-gold/10 px-4 py-2.5 text-sm font-medium text-maroon">
          Your session has expired — please sign in again.
        </p>
      )}
      <LoginForm {...login} />
    </AuthShell>
  )
}

export default LoginPage
