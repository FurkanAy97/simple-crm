import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  bankName: any;
  userId: any;
  user: User = new User()
  firestore = getFirestore();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    });
    this.getUser()
  }

  getUser() {
    onSnapshot(doc(this.firestore, "users", this.userId), (doc) => {
      if (doc.data()) {
        let userData = doc.data();
        this.user = userData as User;
      }
    });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user)
    dialog.componentInstance.userID = this.userId
  }
  
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user)
    dialog.componentInstance.userID = this.userId
  }
}

