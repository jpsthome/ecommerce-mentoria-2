import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { emailInsertedGuard } from './email-inserted.guard';

describe('emailInsertedGuard', () => {
  it('should navigate to email screen when user is falsy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal(null) },
    });

    const router = TestBed.inject(Router);

    jest.spyOn(router, 'navigateByUrl')

    TestBed.runInInjectionContext(emailInsertedGuard);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login/email');
  });

  it('should return true when user is truthy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal('test@email') },
    });

    const guard = TestBed.runInInjectionContext(emailInsertedGuard);

    expect(guard).toBeTruthy();
  });
});
