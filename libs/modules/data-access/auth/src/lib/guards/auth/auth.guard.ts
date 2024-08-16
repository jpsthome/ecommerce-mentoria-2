import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export function authGuard() {
  return () => {
    const router = inject(Router);
    const email = inject(AuthService).email;

    return email() ? router.createUrlTree(['/']) : true;
  };
}
