import { environment } from './../environments/environment.prod';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';
import { LayoutModule } from '@ecommerce-mentoria-2/layout';
import { CartService } from '@ecommerce-mentoria-2/product-data-access';
import { ProductSearchComponent } from '@ecommerce-mentoria-2/product-search';
import { CartComponent } from '@ecommerce-mentoria-2/product-ui';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LayoutModule,
    ProductSearchComponent,
    MatSnackBarModule,
    CartComponent,
    MatButtonModule,
  ],
  selector: 'ecommerce-mentoria-2-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quantity = inject(CartService).quantity;
  adminUrl = environment.admin_url;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.checkAuthentication();
  }
}
