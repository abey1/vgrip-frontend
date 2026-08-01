import { useNavigate } from 'react-router-dom'
import { SignupForm, type SignupFormValues } from '../components/auth/SignupForm'

interface SignupPageProps {
  onSubmit?: (values: SignupFormValues) => void
  onSignIn?: () => void

}

export function SignupPage({ onSubmit, onSignIn }: SignupPageProps) {
  const navigate = useNavigate()
  const onLogin = () => {
    navigate('/login')
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex items-center justify-center px-4 py-16 sm:py-24">
        <SignupForm onSubmit={onSubmit} onSignIn={onSignIn} onLogin={onLogin} />
      </main>
    </div>
  )
}
