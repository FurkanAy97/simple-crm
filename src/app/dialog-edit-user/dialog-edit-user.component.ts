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
  birthDate: Date; // Ensure birthDate is of type Date
  userID: any;
  firestore = getFirestore();
  maxDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.maxDate.setHours(0, 0, 0, 0);
  }

  async saveUser() {
    this.loading = true;
    await this.timeStampIntoDate();

    try {
      await updateDoc(doc(this.firestore, "users", this.userID), {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.user.birthDate
      });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  async timeStampIntoDate() {
    if (this.birthDate instanceof Date && !isNaN(this.birthDate.getTime())) {
      // Format the date as 'YYYY-MM-DD'
      let formattedDate = this.birthDate.toISOString().split('T')[0];
      this.user.birthDate = formattedDate;
    }
  }
}
