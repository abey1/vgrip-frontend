import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { login as loginApi, logout as logoutApi, register as registerApi, refreshToken as refreshTokenApi } from './auth.api'
import type { LoginDto, RegisterDto, UserResponseDto } from './auth.types'
import { setAccessToken } from '../../api/axios'

interface AuthState {
    user: UserResponseDto | null
    username: string | null
    password: string | null
    status: 'idle' | 'loading' | 'success' | 'error'
    error: string | null
    isAuthenticated: boolean
}

function getErrorMessage(error: unknown, fallback: string): string {
    if (isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined
        if (typeof data?.message === 'string' && data.message.trim()) {
            return data.message
        }
        if (error.message) {
            return error.message
        }
    }
    if (error instanceof Error && error.message) {
        return error.message
    }
    if (typeof error === 'string' && error.trim()) {
        return error
    }
    return fallback
}

const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    username: null,
    password: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
}

export const login = createAsyncThunk(
    'auth/login',
    async (dto: LoginDto, { rejectWithValue }) => {
        try {
            return await loginApi(dto)
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Login failed'))
        }
    },
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (dto: RegisterDto, { rejectWithValue }) => {
        try {
            return await registerApi(dto)
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Registration failed'))
        }
    },
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutApi()
        } catch (error) {
            // Local session must still end even if the API call fails.
            return rejectWithValue(getErrorMessage(error, 'Logout failed'))
        }
    },
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            return await refreshTokenApi()
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Session expired'))
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        clearAuthError: (state) => {
            state.error = null
            if (state.status === 'error') {
                state.status = 'idle'
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload.user
                setAccessToken(action.payload.accessToken)
                state.isAuthenticated = true
                state.error = null
                toast.success('Login successful')
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error'
                state.error = (action.payload as string) ?? 'Login failed'
                toast.error(state.error)
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
                state.error = null
                toast.success('Register successful')
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'error'
                state.error = (action.payload as string) ?? 'Registration failed'
                toast.error(state.error)
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'success'
                state.user = null
                state.isAuthenticated = false
                state.error = null
                setAccessToken(null)
                localStorage.removeItem('user')
                toast.success('Logout successful')
            })
            .addCase(logout.rejected, (state, action) => {
                // Clear local auth anyway — user explicitly asked to log out.
                state.status = 'error'
                state.error = (action.payload as string) ?? 'Logout failed'
                state.user = null
                state.isAuthenticated = false
                setAccessToken(null)
                localStorage.removeItem('user')
                toast.error(state.error)
            })
            .addCase(refreshToken.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                const token = action.payload?.token
                if (!token) {
                    setAccessToken(null)
                    state.isAuthenticated = false
                    state.status = 'error'
                    return
                }
                setAccessToken(token)
                state.isAuthenticated = true
                state.status = 'success'
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.status = 'error'
                state.error = (action.payload as string) ?? null
                state.isAuthenticated = false
                setAccessToken(null)
                // No toast here — visiting /login without a session always rejects refresh.
            })
    },
})

export const { setUsername, setPassword, clearAuthError } = authSlice.actions
export default authSlice.reducer
