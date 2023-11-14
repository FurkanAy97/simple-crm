import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/models/user.class';
import { AppComponent } from '../app.component';
import { Firestore, addDoc, setDoc, doc, getDocs, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  user = new User();
  birthDate: any;
  firestore: Firestore = inject(Firestore)
  users$: Observable<any[]>;
  loading: boolean = false

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const userCollection = collection(this.firestore, 'users')
    this.users$ = collectionData(userCollection);
  }

  async saveUser() {
    this.loading = true;
    try {
      this.user.birthDate = this.birthDate.getTime();
      const userRef = await addDoc(collection(this.firestore, 'users'), JSON.parse(JSON.stringify(this.user)));
      console.log('User added successfully with ID:', userRef.id);
      this.emptyFields()
      this.dialogRef.close()
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      this.loading = false;
    }
  }

  emptyFields() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.birthDate = '';
    this.user.street = '';
    this.user.zipCode = undefined;
    this.user.city = '';
  }

}
