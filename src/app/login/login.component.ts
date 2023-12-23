import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  firestore = getFirestore();
}
