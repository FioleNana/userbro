import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ub-users-dialog-edit',
  templateUrl: './users.dialog.add.html',
  styleUrls: ['./users.dialog.add.scss']
})
export class UsersDialogAddComponent {
  @ViewChild('avatar') avatar;

  filelabel = 'Upload an avatar';
  currentUpload = '';

  constructor(
    public dialogRef: MatDialogRef<UsersDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addAvatarToData(event: any) {
    const fileBrowser = this.avatar.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.data.avatar = fileBrowser.files[0];
      this.filelabel = fileBrowser.files[0].name;

      const reader = new FileReader();

      reader.onload = (onloadEvent: any) => {
        this.currentUpload = onloadEvent.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  canSave() {
    let canSave = true;
    canSave = canSave && this.data.user.name.trim().length > 0;
    return canSave;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

