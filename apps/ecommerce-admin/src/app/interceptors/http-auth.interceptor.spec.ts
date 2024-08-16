import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { httpAuthInterceptor } from './http-auth.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { mockProducts } from '@ecommerce-mentoria-2/product-data-access';
import { AuthService } from '@ecommerce-mentoria-2/auth-data-access';

describe('httpAuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpAuthInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpAuthInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization to headers', () => {
    const mockEmail = 'teste@teste.com';
    authService.setEmail(mockEmail);
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush(mockProducts);

    expect(request.request.headers.get('Authorization')).toBe(
      `Bearer ${mockEmail}`
    );
  });
});
