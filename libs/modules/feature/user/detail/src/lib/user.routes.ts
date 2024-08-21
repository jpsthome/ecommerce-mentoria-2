import { Route } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const userRoutes: Route[] = [
  { path: ':id', component: UserDetailComponent },
];
