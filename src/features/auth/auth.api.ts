import { api } from "../../api/axios.ts";

import { API } from "../../api/endpoints.ts";

import type { LoginDto, RegisterDto, LoginResponseDto, RefreshTokenResponseDto, UserResponseDto } from "./auth.types.ts";


export async function login(dto: LoginDto): Promise<LoginResponseDto> {
    const response = await api.post<LoginResponseDto>(API.AUTH.LOGIN, dto);
    return response.data;
}

export async function register(dto: RegisterDto): Promise<UserResponseDto> {
    const response = await api.post<UserResponseDto>(API.AUTH.REGISTER, dto);
    return response.data;
}

export async function logout(): Promise<void> {
    const response = await api.post<void>(API.AUTH.LOGOUT);
    // dispatch is used to set isauthenticated to false
    // dispatch(setIsAuthenticated(false))
    // removeAccessToken()
    return response.data;
}

export async function refreshToken(): Promise<RefreshTokenResponseDto> {
    const response = await api.post<RefreshTokenResponseDto>(API.AUTH.REFRESH);
    // if (!response.data?.token) {
    //     throw new Error('Failed to refresh token');
    // }
    // dispatch is used to set isauthenticated to true
    // dispatch(setIsAuthenticated(true))
    console.log('response.data.token=====>', response.data.token)
    console.log('response.data=====>', response.data)
    // setAccessToken(response.data.token);
    return response.data;
}
