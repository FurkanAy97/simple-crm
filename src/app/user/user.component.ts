import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, getFirestore, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  firestore = getFirestore();
  allUsers: any[] = [];
  birthDateObj: any;

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
    this.dialog.open(DialogAddUserComponent, {});
  }
}

