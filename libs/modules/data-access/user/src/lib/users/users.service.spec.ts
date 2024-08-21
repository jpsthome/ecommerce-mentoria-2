import { userMock, usersMock } from './../mocks/users.mock';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const url = `${service.apiUrl}/users`;
    let result: User[];

    service.getUsers().subscribe((users) => (result = users));

    const request = httpMock.expectOne(url);
    request.flush(usersMock);
    expect(request.request.method).toBe('GET');
    expect(result!).toEqual(usersMock);
  });

  it('should get users', () => {
    const url = `${service.apiUrl}/users/1`;
    let result: User;

    service.getUserById('1').subscribe((users) => (result = users));

    const request = httpMock.expectOne(url);
    request.flush(userMock);
    expect(request.request.method).toBe('GET');
    expect(result!).toEqual(userMock);
  });
});
