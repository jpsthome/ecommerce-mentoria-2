import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { usersMock } from '@ecommerce-mentoria-2/user';
import { UserTableComponent } from './user-table.component';

registerLocaleData(ptBr);

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  const USER_MOCK = usersMock[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTableComponent,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'pt'
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    component.users = [USER_MOCK];
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
      'expand'
    ]);
  });

  it('should contain table headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('tr > th')).map(el => el.nativeElement.textContent.trim());
    expect(headers).toEqual([
      '',
      'Nome',
      'E-mail',
      'Criado em',
      ''
    ]);
  });

  it('should contain table detail rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody > tr'));

    expect(rows.length).toBe(2);

    const [elements, expandEl] = rows;

    const [
      avatarEl,
      nameEl,
      emailEl,
      createdAtEl,
      expandButtonEl
    ] = elements.queryAll(By.css('td'));

    const imgEl = avatarEl.query(By.css('img'));

    expect(imgEl.properties['src']).toBe(USER_MOCK.avatar);
    expect(imgEl.properties['alt']).toBe(`Avatar de ${ USER_MOCK.name }`);

    expect(nameEl.nativeElement.textContent.trim()).toBe(USER_MOCK.name);
    expect(emailEl.nativeElement.textContent.trim()).toBe(USER_MOCK.email);
    expect(createdAtEl.nativeElement.textContent.trim()).toBe('04/03/2024');
    expect(expandButtonEl.nativeElement.textContent.trim()).toBe('keyboard_arrow_down');

    const expandedDataEl = expandEl.query(By.css('td'));

    expect(expandedDataEl.nativeElement.textContent.trim()).toBe(USER_MOCK.biography);
  });

  it('should change expand icon when row is clicked', () => {
    const buttonEl = fixture.nativeElement.querySelector('[data-testid="expandButton"]') as HTMLButtonElement;

    expect(buttonEl.textContent).toBe('keyboard_arrow_down');

    buttonEl.click();

    fixture.detectChanges();

    expect(buttonEl.textContent).toBe('keyboard_arrow_up');
  });

  it('should expand detail div when clicked expand button', () => {
    const buttonEl = fixture.nativeElement.querySelector('[data-testid="expandButton"]') as HTMLButtonElement;
    const detailEl = fixture.debugElement.query(By.css('.element-detail'));

    expect(buttonEl.textContent).toBe('keyboard_arrow_down');

    expect(detailEl.properties['@detailExpand']).toBe('collapsed');

    buttonEl.click();

    fixture.detectChanges();

    expect(detailEl.properties['@detailExpand']).toBe('expanded');
  });
});
