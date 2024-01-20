import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { collection, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  firestore = getFirestore();
  allUsers: any[] = [];
  birthDateObj: any;
  loading: boolean;
  isSmallScreen$: Observable<boolean>;
  isSmall: boolean;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    // Set isSmall based on the initial screen size
    this.isSmall = this.breakpointObserver.isMatched('(max-width: 850px)');

    // Watch for changes in screen size
    this.breakpointObserver.observe(['(max-width: 850px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isSmall = result.matches;
        console.log('Is Small Screen:', this.isSmall);
        // Handle any logic based on screen size changes here
      });
  }

  ngOnInit() {
    const userCollection = collection(this.firestore, 'users');

    onSnapshot(userCollection, (querySnapshot) => {
      this.allUsers = [];
      querySnapshot.forEach((doc) => {
        let userData = doc.data();
        userData['id'] = doc.id;
        this.allUsers.push(userData);
      });
      this.timeStampIntoDate();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
