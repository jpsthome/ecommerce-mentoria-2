import { QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { NavigationStart, provideRouter, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { LayoutModule } from '../layout.module';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [LayoutModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add menu items to menu', () => {
    component.matMenu = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addItem(item: MatMenuItem) {},
    } as MatMenu;

    const addItemSpy = jest.spyOn(component.matMenu, 'addItem');

    const matMenuItemMock = {} as MatMenuItem;

    component.matMenuItems = [
      matMenuItemMock,
      matMenuItemMock,
    ] as unknown as QueryList<MatMenuItem>;

    component.ngAfterContentInit();

    expect(addItemSpy).toHaveBeenCalledTimes(2);
  });

  it('should logout', () => {
    jest.spyOn(component.authService, 'logout');
    jest.spyOn(component.logout, 'emit');

    component.handleLogout();

    expect(component.authService.logout).toHaveBeenCalled();
    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('should navigate to login page', () => {
    const router = TestBed.inject(Router);
    let navigatedUrl = '';

    router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap((event) => (navigatedUrl = (event as NavigationStart).url))
      )
      .subscribe();

    fixture.nativeElement.querySelector('a.user-menu').click();

    expect(navigatedUrl).toBe('/login');
  });
});
