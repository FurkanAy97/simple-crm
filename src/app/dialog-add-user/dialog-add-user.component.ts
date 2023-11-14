import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/models/user.class';
import { AppComponent } from '../app.component';
import { Firestore, addDoc, setDoc, doc, getDocs, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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

  constructor() {
    const userCollection = collection(this.firestore, 'users')
    this.users$ = collectionData(userCollection);
  }

  async saveUser() {
    this.loading = true;
    try {
      this.user.birthDate = this.birthDate.getTime();

      // Assuming this.firestore is your Firestore instance
      const userRef = await addDoc(collection(this.firestore, 'users'), JSON.parse(JSON.stringify(this.user)));

      // Continue your logic here after the user is successfully added
      console.log('User added successfully with ID:', userRef.id);
      this.emptyFields()
      
      // Additional logic can be placed here

    } catch (error) {
      // Handle any errors that occurred during the asynchronous operation
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
