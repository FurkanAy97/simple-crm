import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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

  isSmallScreen = false;
  drawerMode: MatDrawerMode;
  @ViewChild('drawer') drawer!: MatSidenav;
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


    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.isSmallScreen = this.isSmallScreenCheck();
        this.drawerMode = this.calculateDrawerMode();
      });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/') {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = this.isSmallScreenCheck();
      }

      if (event.url === '/dashboard' || event.url === '/user' || event.url === '/products' || event.url === '/legal-notice' && !this.isSmallScreen) {
        this.openDrawer();
      }

      if (this.isSmallScreen && this.router.url !== '/') {
        this.closeDrawer();
      }

      this.drawerMode = this.calculateDrawerMode();
    });
  }


  private calculateDrawerMode(): MatDrawerMode {
    return this.isSmallScreen ? 'over' : 'side';
  }

  private isSmallScreenCheck(): boolean {
    return this.router.url !== '/' && window.innerWidth < 1000;
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 1000;
    this.drawerMode = this.calculateDrawerMode();
  }

  logout(): void {
    this.closeDrawer()
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private closeDrawer(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  private openDrawer(): void {
    if (this.drawer) {
      this.drawer.open();
    }
  }
}
