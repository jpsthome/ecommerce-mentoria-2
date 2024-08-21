import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuItem } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';
import { LayoutModule } from '@ecommerce-mentoria-2/layout';
import { CartService } from '@ecommerce-mentoria-2/product-data-access';
import { ProductSearchComponent } from '@ecommerce-mentoria-2/product-search';
import { CartComponent } from '@ecommerce-mentoria-2/product-ui';
import { environment } from '../environments/environment';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LayoutModule,
    ProductSearchComponent,
    MatSnackBarModule,
    CartComponent,
    MatIconModule,
    MatMenuItem,
  ],
  selector: 'ecommerce-mentoria-2-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  quantity = inject(CartService).quantity;
  adminUrl = environment.admin_url;

  ngOnInit(): void {
    this._authService.checkAuthentication();
  }
}
