import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductSearchService } from '@ecommerce-mentoria-2/product-data-access';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: ProductSearchService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should contain header', () => {
    const header: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('should check if user is authenticated', () => {
    const checkSpy = jest.spyOn(
      component['_authService'],
      'checkAuthentication'
    );

    component.ngOnInit();

    expect(checkSpy).toHaveBeenCalled();
  });
});
