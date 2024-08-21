import { Route } from '@angular/router';
import { authenticatedGuard } from '@ecommerce-mentoria-2/auth-data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    canMatch: [authenticatedGuard],
    loadChildren: () =>
      import('@ecommerce-mentoria-2/panel-home').then((c) => c.homeRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@ecommerce-mentoria-2/auth-form').then((c) => c.authFormRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@ecommerce-mentoria-2/user-detail').then((c) => c.userRoutes),
  },
];
