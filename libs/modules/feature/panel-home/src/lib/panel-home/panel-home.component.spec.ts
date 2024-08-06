import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '@ecommerce-mentoria-2/user';
import { UserTableComponent } from '@ecommerce-mentoria-2/user-ui';
import { PanelHomeComponent } from './panel-home.component';

describe('PanelHomeComponent', () => {
  let component: PanelHomeComponent;
  let fixture: ComponentFixture<PanelHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PanelHomeComponent,
        UserTableComponent,
      ],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn()
          }
        }
      ]
    }).compileComponents();

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

  // it('should render user table', () => {
  //   jest.spyOn(component['userService'], 'getUsers')
  //     .mockReturnValue(of(usersMock));
  //
  //   const userTableEl = fixture.nativeElement.querySelector('ecommerce-mentoria-2-user-table');
  //
  //   expect(userTableEl).toBeTruthy();
  // });
});
