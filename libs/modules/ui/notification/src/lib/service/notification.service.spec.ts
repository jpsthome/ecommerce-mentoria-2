import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../component/notification.component';
import { NotificationType } from '../models/notification-type.enum';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    service = TestBed.inject(NotificationService);
    snackbar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openNotificication should open a snackbar with the received inputs', () => {
    jest.spyOn(snackbar, 'openFromComponent');

    service.openNotification(
      'Mensagem de teste',
      'Titulo de teste',
      NotificationType.SUCCESS
    );
    expect(snackbar.openFromComponent).toHaveBeenCalledWith(
      NotificationComponent,
      {
        data: {
          title: 'Titulo de teste',
          message: 'Mensagem de teste',
        },
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: NotificationType.SUCCESS,
      }
    );
  });

  it('openSuccess should call openNotification with defaul message and the correct notification type', () => {
    jest.spyOn(service, 'openNotification');

    service.openSuccess('Mensagem de sucesso');
    expect(service.openNotification).toHaveBeenCalledWith(
      'Mensagem de sucesso',
      'Sucesso!',
      NotificationType.SUCCESS
    );
  });
  it('openError should call openNotification with defaul message and the correct notification type', () => {
    jest.spyOn(service, 'openNotification');

    service.openError('Mensagem de erro!');
    expect(service.openNotification).toHaveBeenCalledWith(
      'Mensagem de erro!',
      'Ocorreu algum erro!',
      NotificationType.ERROR
    );
  });
  it('openWarning should call openNotification with defaul message and the correct notification type', () => {
    jest.spyOn(service, 'openNotification');

    service.openWarning('Mensagem de aviso');
    expect(service.openNotification).toHaveBeenCalledWith(
      'Mensagem de aviso',
      'Atenção!',
      NotificationType.WARNING
    );
  });
  it('openInfo should call openNotification with the received message and the correct notification type', () => {
    jest.spyOn(service, 'openNotification');

    service.openInfo('Mensagem informativa');
    expect(service.openNotification).toHaveBeenCalledWith(
      'Mensagem informativa',
      'Informação!',
      NotificationType.INFO
    );
  });
});
