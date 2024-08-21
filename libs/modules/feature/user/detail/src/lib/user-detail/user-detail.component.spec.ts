import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { userMock, UsersService } from '@ecommerce-mentoria-2/user';
import { of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, RouterModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserById: () => of(userMock),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
        DatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user card', () => {
    const userCard = fixture.nativeElement.querySelector('mat-card');
    expect(userCard).toBeTruthy();
  });

  it('should redirect to home when button is clicked', () => {
    const routerSpy = jest.spyOn(router, 'navigateByUrl');
    const btnComponent: HTMLAnchorElement =
      fixture.nativeElement.querySelector('a');
    btnComponent.click();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should render the correct infos', () => {
    const id = fixture.nativeElement
      .querySelector('.card__userId')
      .textContent.trim();
    const name = fixture.nativeElement
      .querySelector('.card__userName')
      .textContent.trim();
    const avatar = fixture.nativeElement.querySelector('.card__avatar img');
    const bio = fixture.nativeElement
      .querySelector('.card__bio')
      .textContent.trim();
    const [email, createdAt] =
      fixture.nativeElement.querySelectorAll('.card__info p');

    const datePipe = TestBed.inject(DatePipe);

    expect(id).toBe(`#${userMock.id}`);
    expect(name).toBe(userMock.name);
    expect(bio).toBe(userMock.biography);
    expect(email.textContent.trim()).toBe(userMock.email);
    expect(createdAt.textContent.trim()).toBe(
      datePipe.transform(userMock.createdAt, 'dd/MM/YYYY')
    );
    expect(avatar.src).toBe(userMock.avatar);
    expect(avatar.alt).toBe(`Avatar de ${userMock.name}`);
  });
});
