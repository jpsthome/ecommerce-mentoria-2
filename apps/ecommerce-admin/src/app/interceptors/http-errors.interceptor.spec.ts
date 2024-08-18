import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { httpErrorsInterceptor } from './http-errors.interceptor';
import { NotificationService } from '@ecommerce-mentoria-2/notification';

describe('httpErrorsInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let notification: NotificationService;
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpErrorsInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorsInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    notification = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should open notification on http error', () => {
    jest.spyOn(notification, 'openError');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.error(new ProgressEvent('error'));

    expect(notification.openError).toHaveBeenCalled();
  });

  it('should show the correct error message for status 401', () => {
    jest.spyOn(notification, 'openError');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(notification.openError).toHaveBeenCalledWith(
      'Você não está mais logado no sistema.'
    );
  });
  it('should show the correct error message for status 403', () => {
    jest.spyOn(notification, 'openError');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 403, statusText: 'Unauthorized' });

    expect(notification.openError).toHaveBeenCalledWith(
      'Você não possui permissão pra fazer essa ação.'
    );
  });
  it('should show the correct error message for status 404', () => {
    jest.spyOn(notification, 'openError');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 404, statusText: 'Not Found' });

    expect(notification.openError).toHaveBeenCalledWith(
      'Informação solicitada não pode ser encontrada.'
    );
  });
  it('should show the correct error message for others statuses', () => {
    jest.spyOn(notification, 'openError');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 500, statusText: 'Unhandled' });

    expect(notification.openError).toHaveBeenCalledWith(
      'Aconteceu algum erro desconhecido.'
    );
  });

  it('should show the correct error message received from the error', () => {
    jest.spyOn(notification, 'openError');
    const mockErrorResponse = new HttpErrorResponse({
      error: { message: 'Mensagem de erro personalizada' },
      status: 500,
      statusText: 'Internal Server Error',
      url: '/test',
    });

    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.error(mockErrorResponse.error as ProgressEvent);

    expect(notification.openError).toHaveBeenCalledWith(
      'Mensagem de erro personalizada'
    );
  });

  it('should throw error using throwError', () => {
    const mockErrorResponse = new HttpErrorResponse({
      error: { message: 'Erro simulado' },
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClient.get('/test').subscribe({
      next: () => fail('Deveria ter falhado com um erro HTTP'),
      error: (error) => {
        expect(error).toBe(mockErrorResponse);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });
});
