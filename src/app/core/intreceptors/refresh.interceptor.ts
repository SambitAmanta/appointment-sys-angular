import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

let refreshing = false;
let queue: ((token: string | null) => void)[] = [];

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const tokens = inject(TokenService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Only try refresh on 401 responses (and not /auth endpoints)
      const isAuthUrl = req.url.includes('/auth/');
      if (err.status === 401 && !isAuthUrl && tokens.refresh()) {
        if (!refreshing) {
          refreshing = true;
          return auth.refreshToken()!.then(newAccess => {
            refreshing = false;
            queue.forEach(cb => cb(newAccess));
            queue = [];
            if (!newAccess) throw err;
            const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${newAccess}` } });
            // return as a promise -> convert to observable
            return next(cloned).toPromise();
          }).then(res => res as any).catch(e => throwError(() => e));
        } else {
          // queue requests while refreshing
          return new Promise<any>((resolve, reject) => {
            queue.push((token) => {
              if (!token) return reject(err);
              const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
              next(cloned).subscribe(resolve, reject);
            });
          });
        }
      }
      return throwError(() => err);
    })
  );
};
