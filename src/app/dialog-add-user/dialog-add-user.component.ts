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
  birthDate: Date | null = null;
  firestore: Firestore = inject(Firestore)
  loading: boolean = false
  maxBirthDate: Date = new Date();

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
      if (this.areAllFieldsFilled()) {
        if (this.isValidEmail()) {
          this.user.birthDate = this.birthDate?.getTime() || null;
          const userRef = await addDoc(collection(this.firestore, 'users'), JSON.parse(JSON.stringify(this.user)));
          this.emptyFields();
          this.dialogRef.close();
        } else {
          this.snackBar.open('Please enter a correct email address.', 'Close', {
            duration: 3000,
          });
        }
      } else {
        this.snackBar.open('Please fill all required information.', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      this.snackBar.open('An error occurred. Please try again.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.loading = false;
    }
  }

  areAllFieldsFilled(): boolean {
    return (
      !!this.user.firstName &&
      !!this.user.lastName &&
      !!this.user.email &&
      !!this.birthDate &&
      !!this.user.street &&
      this.user.zipCode !== undefined &&
      !!this.user.city
    );
  }



  emptyFields() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.birthDate = null;
    this.user.street = '';
    this.user.zipCode = undefined;
    this.user.city = '';
  }


}
