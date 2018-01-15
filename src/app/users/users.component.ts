import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {User} from '../shared/user';
import {UsersDialogDeleteComponent} from './usersDialogDelete/users.dialog.delete';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UsersDialogEditComponent} from './usersDialogEdit/users.dialog.edit';
import {UsersDialogAddComponent} from './usersDialogAdd/users.dialog.add';

@Component({
  selector: 'ub-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  currentSort: string;

  blinkuser = -1;

  users: User[] = [];

  constructor(private usersService: UsersService, private dialog: MatDialog, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((result: User[]) => {
      this.users = result;
    }, (error) => {
      console.log(error);
    });
  }

  deleteUser(user: User) {
    const usersDialogDelete = this.dialog.open(UsersDialogDeleteComponent, {
      data: {user: user}
    });

    usersDialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(user).subscribe(() => {
          this.users.splice(this.users.indexOf(user), 1);
          this.snackbar.open('Successfully deleted ' + user.name, '', {
            duration: 3000
          });
        }, (error) => {
          this.snackbar.open('Oh crap! Couldn\'t delete ' + user.name, '', {
            duration: 3000
          });
          console.log(error);
        });
      }
    });
  }

  editUser(user: User) {
    const userClone = Object.assign({}, user);
    const usersDialogEdit = this.dialog.open(UsersDialogEditComponent, {
      width: '700px',
      data: {user: userClone, oldUser: user}
    });

    usersDialogEdit.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editUser(result.user, result.avatar).subscribe((editedUser: User) => {
          const indexUser = this.users.indexOf(user);
          this.users[indexUser] = editedUser;

          // Add random number to URL so the picture refreshes
          const random = Math.random();
          this.users[indexUser].pic = this.users[indexUser].pic + '?' + random;
          this.snackbar.open('Successfully saved ' + editedUser.name, '', {
            duration: 3000
          });
          setTimeout(() => {
            this.blinkuser = user.id;
            setTimeout(() => {
              this.blinkuser = -1;
            }, 200);
          }, 100);
        }, (error) => {
          this.snackbar.open('Oh crap! Couldn\'t save ' + user.name, '', {
            duration: 3000
          });
          console.log(error);
        });
      }
    });
  }

  addUser() {
    const newUser: User = {
      id: 0,
      pic: '',
      name: '',
      supername: '',
      affiliates: ''
    };

    const usersDialogAdd = this.dialog.open(UsersDialogAddComponent, {
      width: '700px',
      data: {user: newUser}
    });

    usersDialogAdd.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.addUser(result.user, result.avatar).subscribe((addedUser: User) => {
          this.users.push(addedUser);
          this.snackbar.open('Successfully added ' + addedUser.name, '', {
            duration: 3000
          });
          setTimeout(() => {
            this.blinkuser = addedUser.id;
            setTimeout(() => {
              this.blinkuser = -1;
            }, 200);
          }, 100);
        }, (error) => {
          this.snackbar.open('Oh crap! Couldn\'t save ' + result.name, '', {
            duration: 3000
          });
          console.log(error);
        });
      }
    });
  }

  isCurrentSort(sort: string): boolean {
    return sort === this.currentSort;
  }

  changeSort(sort: string) {
    this.currentSort = sort;
    this.sortTable();
  }

  sortTable() {
    const sort = this.currentSort;
    this.users = this.users.sort((first, second) => {
      if (first[sort] < second[sort]) {
        return -1;
      }
      if (first[sort] > second[sort]) {
        return 1;
      }

      return 0;
    });
  }

}
