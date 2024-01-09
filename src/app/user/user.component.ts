import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { ExampleUsers } from 'src/models/exampleUsers.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  firestore = getFirestore();
  allUsers: any[] = [];
  exampleUsers = new ExampleUsers()
  birthDateObj: any;
  loading: boolean;

  constructor(public dialog: MatDialog) {}

  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users')

    onSnapshot(userCollection, (querySnapshot) => {
      this.allUsers = [];
      querySnapshot.forEach((doc) => {
        let userData = doc.data();
        userData['id'] = doc.id;
        this.allUsers.push(userData);
      });
      this.timeStampIntoDate()
    });
  }

  async uploadExampleUsersToFirebase() {

    try {
      const userCollection = collection(this.firestore, 'users');
      this.loading = true
      console.log(this.loading);

      await this.clearCollection(this.firestore, userCollection);

      for (const user of this.exampleUsers.exampleUsersArray) {
        await setDoc(doc(userCollection), user);
      }
      console.log('Example products uploaded to Firebase.');
      this.loading = false
      console.log(this.loading);
    } catch (error) {
      console.error('Error uploading example products to Firebase:', error);
    }
  }

  async clearCollection(db: any, collectionRef: any) {
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    console.log('Collection cleared.');
  }

  timeStampIntoDate() {
    this.allUsers.forEach(user => {
      let timestamp = user.birthDate;
      let birthDate = new Date(timestamp);
      let formattedDate = birthDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      user.birthDate = formattedDate;
    });
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}

