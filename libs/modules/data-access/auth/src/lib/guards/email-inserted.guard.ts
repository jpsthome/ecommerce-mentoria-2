import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services';

export function emailInsertedGuard() {
  const router = inject(Router);
  const email$ = inject(AuthService).email$;

  return email$.pipe(
    map((email) => (!email?.length ? router.navigateByUrl('/login/email') : true))
  );
}
