import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginDto, RegisterDto } from '../models/auth.models';
import { TokenService } from './token.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private base = environment.apiBaseUrl;

  async login(dto: LoginDto): Promise<AuthResponse> {
    const res = await firstValueFrom(this.http.post<AuthResponse>(`${this.base}/auth/login`, dto));
    this.tokens.setTokens(res.tokens.accessToken, res.tokens.refreshToken);
    return res;
    // Role-based redirect handled by caller
  }

  async register(dto: RegisterDto): Promise<void> {
    await firstValueFrom(this.http.post<void>(`${this.base}/auth/register`, dto));
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = this.tokens.refresh();
    if (!refreshToken) return null;
    const res = await firstValueFrom(this.http.post<{ accessToken: string }>(`${this.base}/auth/refresh`, { refreshToken }));
    this.tokens.setTokens(res.accessToken, refreshToken);
    return res.accessToken;
  }

  async profile() {
    return firstValueFrom(this.http.get(`${this.base}/auth/profile`));
  }

  logout() {
    this.tokens.clear();
  }
}
