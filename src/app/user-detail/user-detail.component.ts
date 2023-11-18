import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { User } from 'src/models/user.class';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
    });
    this.getUser()
  }

  getUser() {
    onSnapshot(doc(this.firestore, "users", this.userId), (doc) => {
      console.log("Current data: ", doc.data());
      if (doc.data()) {
        let userData = doc.data();
        this.user = userData as User;
      }
    });
  }
}

