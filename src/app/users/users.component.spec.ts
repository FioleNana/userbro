import { TestBed, async } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import {UsersService} from './users.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../shared/user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockUsersService extends UsersService {
  public theUser: User = {
    id: 1,
    pic: '',
    name: 'Bruce Wayne',
    supername: 'The Batman',
    affiliates: 'Justice League'
  };

  public users: Observable<User[]> = Observable.of([this.theUser]);

  constructor() {
    super(null);
  }


  getUsers() {
    return this.users;
  }

  addUser() {
    return new BehaviorSubject<User>(null);
  }

  deleteUser() {
    return null;
  }

  updateUser() {
    return new BehaviorSubject<User>(null);
  }

}

describe('UsersComponent', () => {

  let usersComponent: UsersComponent;
  let service: MockUsersService;
  beforeEach(() => {
    service = new MockUsersService();
    usersComponent = new UsersComponent(service, undefined, undefined);
  });
  it('should be defined', () => {
    expect(usersComponent).toBeTruthy();
  });
  it('should get users', () => {
    usersComponent.getUsers();
    expect(usersComponent.users).toEqual([service.theUser]);
  });
});
