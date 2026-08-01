export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    password: string;
}

export interface UserResponseDto {
    id: string;
    username: string;
    createdAt: Date;
}

export interface LoginResponseDto {
    accessToken: string;
    user: UserResponseDto;
}

export interface RefreshTokenResponseDto {
    token: string;
    expiresAt: string;
}
