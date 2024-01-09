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

