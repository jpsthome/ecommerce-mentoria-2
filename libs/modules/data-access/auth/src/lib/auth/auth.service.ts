import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email = signal<string | null>(null);

  setEmail(email: string): void {
    this.email.set(email);
  }
}
