import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Auth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  public isLoggedIn = false;
  private isLoggedInAsGuest = false;
  public newCreatedEmail: string = '';

  constructor(private firebaseApp: FirebaseApp, private router: Router) {
    this.auth = getAuth(this.firebaseApp);
    this.loadAuthState();
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private loadAuthState() {
    const storedAuthState = localStorage.getItem('isLoggedIn');
    if (storedAuthState) {
      this.isLoggedIn = JSON.parse(storedAuthState);
    }
  }

  private saveAuthState() {
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      this.newCreatedEmail = user.email;
      this.isLoggedIn = true;
      this.saveAuthState();
      this.router.navigate(['/']);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);
      throw error;
    }
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      this.isLoggedIn = true;
      this.saveAuthState();
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    }
  }

  public async guestLogin(): Promise<void> {
    try {
      this.isLoggedIn = true;
      this.isLoggedInAsGuest = true;
      this.saveAuthState();
    } catch (error) {
      console.error('Error during guest login:', error);
      throw error;
    }
  }


  public logout(): void {
    this.isLoggedIn = false;
    this.isLoggedInAsGuest = false;
    this.saveAuthState();
    this.router.navigate(['/']);
  }
}
