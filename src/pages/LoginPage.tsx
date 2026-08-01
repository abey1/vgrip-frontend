import { LoginForm } from '../components/auth/LoginForm'
import type { LoginDto } from '../features/auth/auth.types'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { login, refreshToken } from '../features/auth/auth.slice'

interface LoginPageProps {
  onForgotPassword?: () => void
 
}

export function LoginPage({
  onForgotPassword,

}: LoginPageProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onCreateAccount = () => {
    navigate('/signup')
  }
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [checkingSession, setCheckingSession] = useState(true)

  // Restore session once; only leave /login if refresh proves the user is authenticated.
  useEffect(() => {
    let cancelled = false

    void dispatch(refreshToken()).finally(() => {
      if (!cancelled) setCheckingSession(false)
    })

    return () => {
      cancelled = true
    }
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/campaigns', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginDto) => {
    await dispatch(
      login({
        username: values.username,
        password: values.password,
      }),
    )
  }

  // Wait for the session check (and any redirect) so /campaigns doesn't flash.
  if (checkingSession || isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex items-center justify-center px-4 py-16 sm:py-24">
        <LoginForm
          onSubmitForm={onSubmit}
          onForgotPassword={onForgotPassword}
          onCreateAccount={onCreateAccount}
        />
      </main>
    </div>
  )
}
