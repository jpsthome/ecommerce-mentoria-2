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
import { MatSnackBar } from '@angular/material/snack-bar';

describe('httpErrorsInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;
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
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should open notification on http error', () => {
    jest.spyOn(snackBar, 'open');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.error(new ProgressEvent('error'));

    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should show the correct error message for status 401', () => {
    jest.spyOn(snackBar, 'open');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(snackBar.open).toHaveBeenCalledWith(
      'Você não está mais logado no sistema.',
      expect.anything(),
      expect.anything()
    );
  });
  it('should show the correct error message for status 403', () => {
    jest.spyOn(snackBar, 'open');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 403, statusText: 'Unauthorized' });

    expect(snackBar.open).toHaveBeenCalledWith(
      'Você não possui permissão pra fazer essa ação.',
      expect.anything(),
      expect.anything()
    );
  });
  it('should show the correct error message for status 404', () => {
    jest.spyOn(snackBar, 'open');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 404, statusText: 'Not Found' });

    expect(snackBar.open).toHaveBeenCalledWith(
      'Informação solicitada não pode ser encontrada.',
      expect.anything(),
      expect.anything()
    );
  });
  it('should show the correct error message for others statuses', () => {
    jest.spyOn(snackBar, 'open');
    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.flush({}, { status: 500, statusText: 'Unhandled' });

    expect(snackBar.open).toHaveBeenCalledWith(
      'Aconteceu algum erro desconhecido.',
      expect.anything(),
      expect.anything()
    );
  });

  it('should show the correct error message received from the error', () => {
    jest.spyOn(snackBar, 'open');
    const mockErrorResponse = new HttpErrorResponse({
      error: { message: 'Mensagem de erro personalizada' },
      status: 500,
      statusText: 'Internal Server Error',
      url: '/test',
    });

    httpClient.get('/test').subscribe();

    const request = httpMock.expectOne('/test');
    request.error(mockErrorResponse.error as ProgressEvent);

    expect(snackBar.open).toHaveBeenCalledWith(
      'Mensagem de erro personalizada',
      expect.anything(),
      expect.anything()
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
