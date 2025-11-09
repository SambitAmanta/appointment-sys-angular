import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe();
  // Later: integrate Toastr + global handling:
  // 401 -> logout, 403 -> navigate /unauthorized, 500 -> toast
};
