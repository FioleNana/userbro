import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ub-users-dialog-delete',
  templateUrl: './users.dialog.delete.html',
  styleUrls: ['./users.dialog.delete.scss']
})
export class UsersDialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<UsersDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

