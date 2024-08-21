import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

export function emailInsertedGuard() {
  const router = inject(Router);
  const email = inject(AuthService).email;

  return !email()?.length ? router.navigateByUrl('/login/email') : true;
}
