import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { userMock } from '@ecommerce-mentoria-2/user';
import { UserTableComponent } from './user-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationStart, provideRouter, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

registerLocaleData(ptBr);

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTableComponent,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'pt',
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    component.users = [userMock];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'avatar',
      'name',
      'email',
      'createdAt',
      'actions',
    ]);
  });

  it('should contain table headers', () => {
    const headers = fixture.debugElement
      .queryAll(By.css('tr > th'))
      .map((el) => el.nativeElement.textContent.trim());
    expect(headers).toEqual(['', 'Nome', 'E-mail', 'Criado em', '']);
  });

  it('should contain table detail rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody > tr'));

    expect(rows.length).toBe(1);

    const [elements] = rows;

    const [avatarEl, nameEl, emailEl, createdAtEl, actionsEl] =
      elements.queryAll(By.css('td'));

    const imgEl = avatarEl.query(By.css('img'));

    expect(imgEl.properties['src']).toBe(userMock.avatar);
    expect(imgEl.properties['alt']).toBe(`Avatar de ${userMock.name}`);

    expect(nameEl.nativeElement.textContent.trim()).toBe(userMock.name);
    expect(emailEl.nativeElement.textContent.trim()).toBe(userMock.email);
    expect(createdAtEl.nativeElement.textContent.trim()).toBe('04/03/2024');
    expect(actionsEl.nativeElement.textContent.trim()).toContain('list_alt');
  });

  it('should redirect to user detail', () => {
    const router = TestBed.inject(Router);
    let navigatedUrl = '';

    router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap((event) => (navigatedUrl = (event as NavigationStart).url))
      )
      .subscribe();

    fixture.nativeElement.querySelector('a').click();

    expect(navigatedUrl).toBe(`/users/${userMock.id}`);
  });
});
