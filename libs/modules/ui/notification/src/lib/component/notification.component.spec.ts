import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let snackbarRef: MatSnackBarRef<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            title: 'Teste de titulo',
            message: 'Teste de mensagem',
          },
        },
        {
          provide: MatSnackBarRef,
          useValue: {
            dismiss: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    snackbarRef = TestBed.inject(MatSnackBarRef<NotificationComponent>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the snackBar when Escape key is pressed', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
    });

    document.dispatchEvent(event);

    expect(snackbarRef.dismiss).toHaveBeenCalled();
  });

  it('should dismiss the snackBar when the close button is clicked', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();
    expect(snackbarRef.dismiss).toHaveBeenCalled();
  });

  it('should render the received data correctly', () => {
    const titleElement: HTMLParagraphElement =
      fixture.nativeElement.querySelector('.lib-notification__title');
    const messageElement: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');

    expect(titleElement.textContent).toContain('Teste de titulo');
    expect(messageElement.textContent).toContain('Teste de mensagem');
  });
});
