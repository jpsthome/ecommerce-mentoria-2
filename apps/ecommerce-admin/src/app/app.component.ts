import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';
import { LayoutModule } from '@ecommerce-mentoria-2/layout';
import { environment } from '../environments/environment';

@Component({
  standalone: true,
  selector: 'ecommerce-mentoria-2-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    LayoutModule,
    MatButton,
    MatMenuModule,
    MatIconModule,
  ],
})
export class AppComponent implements OnInit {
  private readonly _router = inject(Router);
  readonly authService = inject(AuthService);

  ecommerceUrl = environment.ecommerce_url;

  ngOnInit(): void {
    this.authService.checkAuthentication();
  }

  logout(): void {
    this._router.navigateByUrl('/login');
  }
}
