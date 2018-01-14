import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {User} from '../shared/user';
import {RequestOptions} from '@angular/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:1337/ub/users');
  }

  addUser(user: User, avatar: any) {
    const formdata = new FormData();
    formdata.append('name', user.name);
    formdata.append('supername', user.supername);
    formdata.append('affiliates', user.affiliates);
    formdata.append('avatar', avatar);

    return this.http.post('http://localhost:1337/ub/users/', formdata);
  }

  deleteUser(user: User) {
    return this.http.delete('http://localhost:1337/ub/users/' + user.id);
  }

  editUser(user: User, avatar: any) {
    const formdata = new FormData();
    formdata.append('id', user.id + '');
    formdata.append('name', user.name);
    formdata.append('supername', user.supername);
    formdata.append('affiliates', user.affiliates);
    formdata.append('avatar', avatar);

    return this.http.put('http://localhost:1337/ub/users/' + user.id, formdata);
  }
}
