import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuItemAnchorDirective } from './menu-item-anchor/menu-item-anchor.directive';
import { UserMenuComponent } from './user-menu/user-menu.component';

const EXPORT_SOURCES = [
  HeaderComponent,
  UserMenuComponent,
  MenuItemAnchorDirective,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: [...EXPORT_SOURCES],
  exports: [...EXPORT_SOURCES],
})
export class LayoutModule {}
