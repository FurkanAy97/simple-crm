import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  isSmallScreen = window.innerWidth < 1000;
  drawerMode: MatDrawerMode = this.isSmallScreen ? 'over' : 'side';

  private ngUnsubscribe = new Subject<void>();

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);

    // Subscribe to changes in screen size using BreakpointObserver
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.drawerMode = this.isSmallScreen ? 'over' : 'side';
      });

    // Subscribe to route changes and close the drawer on NavigationEnd
    this.router.events.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(event => {
      if (event instanceof NavigationEnd && this.isSmallScreen) {
        // Close the drawer
        this.closeDrawer();
      }
    });
  }
  @ViewChild('drawer') drawer!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 1000;
    this.drawerMode = this.isSmallScreen ? 'over' : 'side';
  }

  logout(): void {
    this.authService.logout();
  }

  // Unsubscribe from observables when the component is destroyed
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Access the mat-drawer through the ViewChild reference and close it
  private closeDrawer(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }
}
