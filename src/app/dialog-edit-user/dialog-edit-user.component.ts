import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  loading: boolean = false;
  user: any;
  birthDate: any;
  userID: any;
  firestore = getFirestore();

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
  }
  async saveUser() {
    this.loading = true;

    try {
      let formattedDate = this.birthDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      await updateDoc(doc(this.firestore, "users", this.userID), {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: formattedDate
      });
      debugger
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

}
