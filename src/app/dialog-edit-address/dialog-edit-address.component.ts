import { BooleanInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  loading: boolean = false;
  user: any;
  userID: any;
  firestore = getFirestore();

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
  }
  async saveUser() {
    this.loading = true;

    try {
    await updateDoc(doc(this.firestore, "users", this.userID), {
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city
    });
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    this.loading = false;
    this.dialogRef.close();
  }
}
}
