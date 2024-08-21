import { computed, Injectable, signal } from '@angular/core';
import { UserCredentials } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly COOKIE_AUTHENTICATION_KEY = 'ecommerce_token';

  credentials = signal<UserCredentials | null>(null);
  isAuthenticated = computed(() => !!this.credentials());
  email = signal<string | null>(null);

  setEmail(email: string): void {
    this.email.set(email);
  }

  checkAuthentication(): void {
    const credentialsCookie = document.cookie.split(';')
      .find(cookie => cookie.split('=')[0].trim() == this.COOKIE_AUTHENTICATION_KEY);

    if (credentialsCookie) {
      const stringData = credentialsCookie.split('=')[1];
      this.credentials.set(JSON.parse(window.atob(stringData)));
    }
  }

  login(credentials: UserCredentials) {
    const cookie = window.btoa(JSON.stringify(credentials));
    const expire = new Date();
    expire.setTime(expire.getTime() + (30 * 60 * 1000));
    this._setCookie(cookie, expire);
    this.credentials.set(credentials);
  }

  logout() {
    const expire = new Date(-1);
    this._setCookie('', expire);
    this.credentials.set(null);
  }

  private _setCookie(cookie: string, expire: Date) {
    document.cookie = [
      `${ this.COOKIE_AUTHENTICATION_KEY }=${ cookie.normalize('NFD') }`,
      `expires=${ expire.toUTCString() }`,
      'path=/'
    ].join('; ');
  }
}
