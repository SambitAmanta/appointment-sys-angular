import { Injectable, signal } from '@angular/core';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  access = signal<string | null>(localStorage.getItem(ACCESS_KEY));
  refresh = signal<string | null>(localStorage.getItem(REFRESH_KEY));

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    this.access.set(accessToken);
    this.refresh.set(refreshToken);
  }
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.access.set(null);
    this.refresh.set(null);
  }
}
