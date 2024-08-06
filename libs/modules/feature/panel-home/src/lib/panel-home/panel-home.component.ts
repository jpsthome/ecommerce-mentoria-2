import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UsersService } from '@ecommerce-mentoria-2/user';
import { UserTableComponent } from '@ecommerce-mentoria-2/user-ui';

@Component({
  standalone: true,
  imports: [CommonModule, UserTableComponent, MatProgressSpinner],
  templateUrl: './panel-home.component.html',
  styleUrl: './panel-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHomeComponent {
  private userService = inject(UsersService);

  users$ = this.userService.getUsers();
}
