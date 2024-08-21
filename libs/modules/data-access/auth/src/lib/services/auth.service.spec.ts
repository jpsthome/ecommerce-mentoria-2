import { TestBed } from '@angular/core/testing';
import { UserCredentials } from '../models/user-credentials.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const credentials: UserCredentials = {
    email: 'test@email',
    password: 'test123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch email changed', () => {
    const expectedEmail = 'email@mail.com';

    service.setEmail(expectedEmail);

    expect(expectedEmail).toBe(service.email());
  });

  it('should set credentials when have cookie', () => {
    const getCookieSpy = jest.spyOn(document, 'cookie', 'get');

    getCookieSpy.mockReturnValue('');

    service.checkAuthentication();

    expect(service.credentials()).toBeNull();

    getCookieSpy.mockReturnValue(
      `ecommerce_token=${window.btoa(JSON.stringify(credentials))}`
    );

    service.checkAuthentication();

    expect(service.credentials()).toEqual(credentials);
  });

  it('should set cookie and update credentials', () => {
    const now = new Date();
    const expectedDate = new Date(now);
    expectedDate.setTime(now.getTime() + 30 * 60 * 1000);
    const expectedCookie = window.btoa(JSON.stringify(credentials));

    jest.spyOn(service as never, '_setCookie');
    jest.useFakeTimers({ now });

    service.login(credentials);

    expect(service['_setCookie']).toHaveBeenCalledWith(
      expectedCookie,
      expectedDate
    );
    expect(service.credentials()).toEqual(credentials);
  });

  it('should remove cookie and credentials', () => {
    jest.spyOn(service as never, '_setCookie');

    service.credentials.set(credentials);

    service.logout();

    expect(service['_setCookie']).toHaveBeenCalledWith('', new Date(-1));
    expect(service.credentials()).toBeNull();
  });

  it('should set cookie', () => {
    const cookie = window.btoa(JSON.stringify(credentials));

    const setCookieSpy = jest.spyOn(document, 'cookie', 'set');

    service['_setCookie'](cookie, new Date('2020-01-01 00:00 GMT+00:00 '));

    expect(setCookieSpy).toHaveBeenCalledWith(
      `ecommerce_token=${cookie}; expires=Wed, 01 Jan 2020 00:00:00 GMT; path=/`
    );
  });
});
