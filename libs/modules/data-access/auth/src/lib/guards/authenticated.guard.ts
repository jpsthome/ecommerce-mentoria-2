import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const authenticatedGuard: CanMatchFn = () => {
  const service = inject(AuthService);
  const router = inject(Router);

  if (!service.isAuthenticated()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
