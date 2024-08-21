import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';

@Component({
  selector: 'ecommerce-mentoria-2-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements AfterContentInit {
  readonly authService = inject(AuthService);

  @ViewChild(MatMenu, { static: false }) matMenu!: MatMenu;
  @ContentChildren(MatMenuItem, { read: true })
  matMenuItems!: QueryList<MatMenuItem>;

  @Output() logout = new EventEmitter<void>();

  ngAfterContentInit() {
    this.matMenuItems.forEach((menuItem) => this.matMenu.addItem(menuItem));
  }

  handleLogout() {
    this.authService.logout();
    this.logout.emit();
  }
}
