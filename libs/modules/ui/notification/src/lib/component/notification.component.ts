import {
  Component,
  HostListener,
  Inject,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBarLabel,
  MatSnackBarActions,
  MatSnackBarAction,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotificationData } from '../models/notification-data.model';

@Component({
  selector: 'lib-notification',
  templateUrl: 'notification.component.html',
  styleUrl: 'notification.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
    MatProgressBarModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);

data: NotificationData = inject(MAT_SNACK_BAR_DATA);

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.snackBarRef.dismiss();
  }
}
