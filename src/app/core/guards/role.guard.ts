import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Role } from '../../shared/utils/roles';

export const roleGuard = (allowed: Role[]): CanActivateFn => {
  return () => {
    const tokens = inject(TokenService);
    const router = inject(Router);

    if (!tokens.access()) {
      router.navigateByUrl('/auth/login');
      return false;
    }
    // Minimal decode (assumes JWT payload has "role")
    const payload = tokens.access()!.split('.')[1];
    try {
      const json = JSON.parse(atob(payload));
      if (allowed.includes(json.role)) return true;
    } catch {}
    router.navigateByUrl('/unauthorized');
    return false;
  };
};
