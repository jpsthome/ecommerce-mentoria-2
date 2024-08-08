import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { usersMock, UsersService } from '@ecommerce-mentoria-2/user';
import { UserTableComponent } from '@ecommerce-mentoria-2/user-ui';
import { PanelHomeComponent } from './panel-home.component';
import { of } from 'rxjs';

describe('PanelHomeComponent', () => {
  let component: PanelHomeComponent;
  let fixture: ComponentFixture<PanelHomeComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHomeComponent, UserTableComponent, NoopAnimationsModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
          },
        },
      ],
    }).compileComponents();
    usersService = TestBed.inject(UsersService);

    fixture = TestBed.createComponent(PanelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should active loading template', () => {
    const loadingEl = fixture.nativeElement.querySelector('.loading');

    expect(loadingEl).toBeTruthy();
    expect(loadingEl.textContent.trim()).toBe('Buscando usuários');
  });

  it('should render user table', () => {
    jest.spyOn(usersService, 'getUsers').mockReturnValue(of(usersMock));

    fixture = TestBed.createComponent(PanelHomeComponent);
    fixture.detectChanges();

    const userTableEl = fixture.nativeElement.querySelector(
      'ecommerce-mentoria-2-user-table'
    );

    expect(userTableEl).toBeTruthy();
  });
});
