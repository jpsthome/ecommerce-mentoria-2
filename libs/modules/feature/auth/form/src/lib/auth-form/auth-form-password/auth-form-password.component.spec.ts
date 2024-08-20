import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { UserCredentials } from '@ecommerce-mentoria-2/auth-data-access';
import { AuthFormComponent } from '../auth-form.component';
import { AuthFormPasswordComponent } from './auth-form-password.component';

describe('AuthFormPasswordComponent', () => {
  let component: AuthFormPasswordComponent;
  let fixture: ComponentFixture<AuthFormPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormPasswordComponent, NoopAnimationsModule],
      providers: [AuthFormComponent, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate to home', () => {
    const credentials: UserCredentials = {
      email: 'test@email',
      password: 'test123'
    };

    jest.spyOn(component['_authService'], 'login');
    jest.spyOn(component['_router'], 'navigate');

    component.form.patchValue(credentials);

    fixture.nativeElement.querySelector('[data-testid="submit-btn"]').dispatchEvent(new Event('click'));

    expect(component['_authService'].login).toBeCalledWith(credentials);
    expect(component['_router'].navigate).toHaveBeenCalledWith(['/']);
  });
});
