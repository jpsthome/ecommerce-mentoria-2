import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@ecommerce-mentoria-2/layout';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule],
  selector: 'ecommerce-mentoria-2-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce-admin';
}
