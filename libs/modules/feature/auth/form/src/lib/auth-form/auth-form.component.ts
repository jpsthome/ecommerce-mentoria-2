import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';

@Component({
  selector: 'ecommerce-mentoria-2-auth-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit {
  private readonly _service = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit(): void {
    this._service.logout();
  }
}
