import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { emailInsertedGuard } from './email-inserted.guard';
import { signal } from '@angular/core';

describe('emailInsertedGuard', () => {
  it('should return true when user is not truthy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal(null) },
    });

    const guard = TestBed.runInInjectionContext(emailInsertedGuard);
    expect(guard).toBeTruthy();
  });

  it('should NOT return true when user is truthy', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.overrideProvider(AuthService, {
      useValue: { email: signal(true) },
    });

    const guard = TestBed.runInInjectionContext(emailInsertedGuard);

    expect(guard).toBeFalsy();
  });
});
