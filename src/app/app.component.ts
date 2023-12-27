import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;


  constructor(public authService: AuthService) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
    this.authService.isAuthenticated
  }

  logout(): void {
    this.authService.logout();
  }
}
