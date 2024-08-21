import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { credentialsMock } from '@ecommerce-mentoria-2/auth-data-access';
import { UserMenuComponent } from '@ecommerce-mentoria-2/layout';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show header when user is logged', () => {
    component.authService.credentials.set(null);

    fixture.detectChanges();

    let headerEl = fixture.debugElement.query(
      By.css('ecommerce-mentoria-2-header')
    );

    expect(headerEl).toBeNull();

    component.authService.credentials.set(credentialsMock);

    fixture.detectChanges();

    headerEl = fixture.debugElement.query(
      By.css('ecommerce-mentoria-2-header')
    );

    expect(headerEl).toBeTruthy();
  });

  it('should render email in userMenu', () => {
    component.authService.credentials.set(credentialsMock);

    fixture.detectChanges();

    const userMenuText = fixture.nativeElement.querySelector(
      '[data-testid="userMenu"]'
    ).textContent;

    expect(userMenuText.trim()).toBe(`account_circle ${credentialsMock.email}`);
  });

  it('should logout account', () => {
    component.authService.credentials.set(credentialsMock);

    fixture.detectChanges();

    const menuEl = fixture.debugElement.query(
      By.css('ecommerce-mentoria-2-user-menu')
    );

    const navigateSpy = jest.spyOn(component['_router'], 'navigateByUrl');

    (menuEl.componentInstance as UserMenuComponent).logout.emit();

    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });
});
