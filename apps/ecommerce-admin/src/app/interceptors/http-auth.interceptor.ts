import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';

export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.email()}`,
    },
  });
  return next(clonedRequest);
};
