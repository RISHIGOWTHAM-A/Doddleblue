import { Link } from 'react-router-dom'
import AuthShell from '../../components/AuthShell'
import SignupForm from './_components/SignupForm'
import { useSignup } from './_hooks/useSignup'

const PANEL_IMAGE =
  'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/6123/applications/6540fb587c9ad5e1e1163228/blogs/pictures/free-featured/original/E-z8EaLwl-Why-Everyone-Wants-These-Royal-Sweet-Arrivals-Blog-Banner.jpeg'

const SignupPage = () => {
  const signup = useSignup()

  return (
    <AuthShell
      panelImage={PANEL_IMAGE}
      title="Create Account"
      subtitle="Join Royal Sweets for authentic Indian delicacies"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-maroon font-semibold hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm {...signup} />
    </AuthShell>
  )
}

export default SignupPage
