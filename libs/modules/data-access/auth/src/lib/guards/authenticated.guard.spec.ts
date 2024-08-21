import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Route, Router } from '@angular/router';
import { AuthService } from '../services';

import { authenticatedGuard } from './authenticated.guard';


describe('authenticatedGuard', () => {
  it('should return true when has authenticated user', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: signal(true)
          }
        }
      ]
    });

    const isAuthenticated = TestBed.runInInjectionContext(() => authenticatedGuard({} as Route, [])) as boolean;

    expect(isAuthenticated).toBeTruthy();
  });

  it('should return false and navigate to login when is not authenticated user', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: signal(false)
          }
        }
      ]
    });

    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');

    TestBed.runInInjectionContext(() => authenticatedGuard({} as Route, []));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
