import { ThemeToggleComponent } from '@ecommerce-mentoria-2/color-theme';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class LayoutModule {}
