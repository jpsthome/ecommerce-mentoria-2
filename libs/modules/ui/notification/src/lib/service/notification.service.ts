import { MatSnackBar } from '@angular/material/snack-bar';
import { inject, Injectable } from '@angular/core';
import { NotificationComponent } from '../component/notification.component';
import { NotificationType } from '../models/notification-type.enum';
import { NotificationData } from '../models/notification-data.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  openSuccess(message: string, title = 'Sucesso!') {
    this.openNotification(message, title, NotificationType.SUCCESS);
  }

  openError(message: string, title = 'Ocorreu algum erro!') {
    this.openNotification(message, title, NotificationType.ERROR);
  }

  openWarning(message: string, title = 'Atenção!') {
    this.openNotification(message, title, NotificationType.WARNING);
  }

  openInfo(message: string, title = 'Informação!') {
    this.openNotification(message, title, NotificationType.INFO);
  }

  openNotification(
    message: string,
    title: string,
    notificationType: NotificationType
  ) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationData>(
      NotificationComponent,
      {
        data: {
          message: message,
          title: title,
        },
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: notificationType,
      }
    );
  }
}
