import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { UserService } from 'src/services/user.service';

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
  allUsers: any[];
  foundUser: any;
  userPurchases: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    });

    await this.userService.downloadUsers();
    this.allUsers = this.userService.allUsers;

    await this.getUser();

    onSnapshot(doc(this.firestore, "users", this.userId), (doc) => {
      if (doc.data()) {
        let userData = doc.data();
        this.user = userData as User;

        if (this.allUsers) {
          this.foundUser = this.allUsers.find(user => user.firstName === this.user.firstName);
          this.userPurchases = this.foundUser.purchases

        }
      }
    });
  }



  async getUser() {
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

