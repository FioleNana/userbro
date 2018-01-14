import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatSnackBarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersDialogDeleteComponent } from './users/usersDialogDelete/users.dialog.delete';
import { UsersDialogEditComponent } from './users/usersDialogEdit/users.dialog.edit';
import { UsersDialogAddComponent } from './users/usersDialogAdd/users.dialog.add';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UsersDialogDeleteComponent,
    UsersDialogEditComponent,
    UsersDialogAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    UsersDialogDeleteComponent,
    UsersDialogEditComponent,
    UsersDialogAddComponent
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
