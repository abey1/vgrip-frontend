import { useState } from 'react'
import { Eye, EyeOff, Lock, UserPlus, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Card, CardHeader } from '../ui/Card'
import { Input } from '../ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  signupSchema,
  type SignupFormValuesSchemaType,
} from '../../features/auth/auth.schema'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { clearAuthError, registerUser } from '../../features/auth/auth.slice'

export interface SignupFormValues {
  username: string
  password: string
}

interface SignupFormProps {
  onSubmit?: (values: SignupFormValues) => void
  onSignIn?: () => void
  onLogin?: () => void
}

export function SignupForm({ onLogin }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValuesSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onValidSubmit = async (data: SignupFormValuesSchemaType) => {
    dispatch(clearAuthError())
    try {
      await dispatch(
        registerUser({
          username: data.username,
          password: data.password,
        }),
      ).unwrap()
      navigate('/login')
    } catch {
      // Error is stored in auth.error and toasted in the slice
    }
  }

  return (
    <Card className="w-full max-w-md p-8 sm:p-10">
      <CardHeader
        align="center"
        icon={<UserPlus className="size-5" />}
        title="Create your account"
        description="Set up your VGRIP workspace and start building your campaign pipeline."
      />

      <form className="space-y-5" onSubmit={handleSubmit(onValidSubmit)}>
        <Input
          label="Username"
          autoComplete="username"
          placeholder="e.g. alex.morgan"
          {...register('username')}
          leftIcon={<User className="size-4" />}
        />
        {errors.username ? (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        ) : null}

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Create a password"
          {...register('password')}
          leftIcon={<Lock className="size-4" />}
          rightIcon={
            showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )
          }
          onRightIconClick={() => setShowPassword((prev) => !prev)}
          rightIconLabel={showPassword ? 'Hide password' : 'Show password'}
        />
        {errors.password ? (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        ) : null}

        <Input
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          {...register('confirmPassword')}
          leftIcon={<Lock className="size-4" />}
          rightIcon={
            showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )
          }
          onRightIconClick={() => setShowConfirmPassword((prev) => !prev)}
          rightIconLabel={
            showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
          }
        />
        {errors.confirmPassword ? (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onLogin}
          className="font-medium text-teal-600 hover:text-teal-700"
        >
          Sign in
        </button>
      </p>
    </Card>
  )
}
