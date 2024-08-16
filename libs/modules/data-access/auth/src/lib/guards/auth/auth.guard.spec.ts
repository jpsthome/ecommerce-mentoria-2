import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { authGuard } from './auth.guard';
import { signal } from '@angular/core';

describe('authGuard', () => {
  it('should return true when user is not truthy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal(null) },
    });

    const guard = TestBed.runInInjectionContext(authGuard());
    expect(guard).toBe(true);
  });

  it('should NOT return true when user is truthy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal(true) },
    });

    const guard = TestBed.runInInjectionContext(authGuard());

    expect(guard).not.toBe(true);
  });
});
