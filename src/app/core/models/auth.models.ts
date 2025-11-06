import { Role } from '../../shared/utils/roles';

export interface LoginDto { email: string; password: string; }
export interface RegisterDto { name: string; email: string; password: string; role: Role; }
export interface Tokens { accessToken: string; refreshToken: string; }
export interface AuthUser { id: string; name: string; email: string; role: Role; }
export interface AuthResponse { user: AuthUser; tokens: Tokens; }
