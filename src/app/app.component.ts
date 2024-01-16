import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  isSmallScreen = window.innerWidth < 1000;

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public userService: UserService,
  ) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
    this.authService.isAuthenticated;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }

  logout(): void {
    this.authService.logout();
  }
}
