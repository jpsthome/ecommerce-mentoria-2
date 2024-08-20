import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';
import { debounceTime, tap } from 'rxjs';
import { AuthFormComponent } from '../auth-form.component';

@Component({
  selector: 'ecommerce-mentoria-2-auth-form-email',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './auth-form-email.component.html',
  styleUrl: './auth-form-email.component.scss',
})
export class AuthFormEmailComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  control = inject(AuthFormComponent).form.controls.email;

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(200),
      tap((email) => this._authService.setEmail(email))
    ).subscribe()
  }
}
