import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ub-users-dialog-edit',
  templateUrl: './users.dialog.edit.html',
  styleUrls: ['./users.dialog.edit.scss']
})
export class UsersDialogEditComponent {
  @ViewChild('avatar') avatar;

  filelabel = 'Upload an avatar';

  constructor(
    public dialogRef: MatDialogRef<UsersDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addAvatarToData() {
    const fileBrowser = this.avatar.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.data.avatar = fileBrowser.files[0];
      this.filelabel = fileBrowser.files[0].name;
    }
  }

  canSave() {
    let canSave = true;
    canSave = canSave && this.data.user.name.trim().length > 0;
    return canSave;
  }

  revertField(field: string) {
    this.data.user[field] = this.data.oldUser[field];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

