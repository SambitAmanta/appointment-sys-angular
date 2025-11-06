import { Injectable, signal } from '@angular/core';
const THEME_KEY = 'prefers_dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private stored = localStorage.getItem(THEME_KEY);
  isDark = signal(this.stored ? this.stored === 'true' : window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  toggle() {
    const next = !this.isDark();
    this.isDark.set(next);
    localStorage.setItem(THEME_KEY, String(next));
  }
}
