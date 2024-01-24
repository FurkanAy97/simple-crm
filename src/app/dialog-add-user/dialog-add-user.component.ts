import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  user = new User();
  birthDate: any;
  firestore: Firestore = inject(Firestore)
  loading: boolean = false

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private snackBar: MatSnackBar) {

  }
  emailInvalid = false;

  isValidEmail(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return emailPattern.test(this.user.email);
  }

  async saveUser() {
    this.loading = true;
    try {
      if (this.isValidEmail()) {
        this.user.birthDate = this.birthDate.getTime();
        const userRef = await addDoc(collection(this.firestore, 'users'), JSON.parse(JSON.stringify(this.user)));
        this.emptyFields()
        this.dialogRef.close()
      } else {
        this.snackBar.open('Please enter a correct email adress.', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      this.snackBar.open('Please fill all information.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.loading = false;
    }
  }

  emptyFields() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.birthDate = '';
    this.user.street = '';
    this.user.zipCode = undefined;
    this.user.city = '';
  }

}
