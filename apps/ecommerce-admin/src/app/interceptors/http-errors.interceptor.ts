import { NotificationService } from '@ecommerce-mentoria-2/notification';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

function getMensagemErro(status: number) {
  let errorMessage = '';
  switch (status) {
    case 401:
      errorMessage = 'Você não está mais logado no sistema.';
      break;
    case 403:
      errorMessage = 'Você não possui permissão pra fazer essa ação.';
      break;
    case 404:
      errorMessage = 'Informação solicitada não pode ser encontrada.';
      break;
    default:
      errorMessage = `Aconteceu algum erro desconhecido.`;
  }
  return errorMessage;
}

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);
  const clonedRequest = req.clone();

  return next(clonedRequest).pipe(
    catchError((error) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent || error.error?.message) {
        errorMessage = error.error?.message || error.message;
      } else {
        errorMessage = getMensagemErro(error.status);
      }
      notification.openError(errorMessage);
      return throwError(() => error);
    })
  );
};
