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


  constructor() {
    const userCollection = collection(this.firestore, 'users')
    this.users$ = collectionData(userCollection);
  }
  
  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    await setDoc(doc(this.firestore, 'users', 'j2X9lKe3PDRtCkN7zw5N'),  JSON.parse(JSON.stringify(this.user)));
  }

}
