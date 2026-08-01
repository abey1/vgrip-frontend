import { useState} from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader } from '../ui/Card'
import { Checkbox } from '../../components/ui/Checkbox'
import { Input } from '../ui/Input'
import type{ LoginDto } from '../../features/auth/auth.types'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {loginSchema, type LoginFormValuesSchemaType} from '../../features/auth/auth.schema'
import { login, setUsername, setPassword } from '../../features/auth/auth.slice'

interface LoginFormProps {
    onSubmitForm: (values: LoginDto) => void
    onForgotPassword?: () => void
    onCreateAccount?: () => void
}

export function LoginForm({
  onSubmitForm,
  onForgotPassword,
  onCreateAccount,
}: LoginFormProps) {
const dispatch = useAppDispatch()
const navigate = useNavigate()
const {status, error, username, password} = useAppSelector((state) => state.auth)
// const {setUsername, setPassword} = useAppDispatch()

//   const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginFormValuesSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

 

  
//   const onSubmit = async (values: LoginDto) => {
//     console.log('values', values)
//     await dispatch(
//         login({
//             username: values.username,
//             password: values.password,
//         })
//     );
//   }

  return (
    <Card className="w-full max-w-md p-8 sm:p-10">
      <CardHeader
        align="center"
        icon={<Lock className="size-5" />}
        title="Welcome back"
        description="Sign in to manage your campaigns and keep your lead pipeline moving."
      />

      <form className="space-y-5" onSubmit={handleSubmit(onSubmitForm)}>
        <Input
          label="Username"
          autoComplete="username"
          placeholder="e.g. alex.morgan"
       
        {...register('username')}
          leftIcon={<User className="size-4" />}
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
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
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <div className="flex items-center justify-between gap-3">
          <Checkbox
            label="Remember me"
          />
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        New to VGRIP?{' '}
        <button
          type="button"
          onClick={onCreateAccount}
          className="font-medium text-teal-600 hover:text-teal-700"
        >
          Create an account
        </button>
      </p>
    </Card>
  )
}
