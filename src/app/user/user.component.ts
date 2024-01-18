import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { collection, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, takeUntil } from 'rxjs';

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
    this.isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map(result => result.matches));
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

    // Subscribe to changes in screen size
    this.isSmallScreen$.pipe(takeUntil(this.destroy$)).subscribe((isSmall) => {
      console.log('Is Small Screen:', isSmall);
      this.isSmall = isSmall
      // Handle any logic based on screen size changes here
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
