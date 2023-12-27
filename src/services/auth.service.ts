import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth;
  private isLoggedIn = false;
  private isLoggedInAsGuest = false;

  constructor(@Inject(FirebaseApp) private firebaseApp: FirebaseApp, private router: Router) {
    this.auth = getAuth(this.firebaseApp);
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  async signUpWithEmailAndPassword(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      this.isLoggedIn = true;
      console.log(user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
      throw error;
    }
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      this.isLoggedIn = true;
      console.log('Logged in user:', user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging in:", errorCode, errorMessage);
      throw error;
    }
  }

  public guestLogin() {
    this.isLoggedIn = true;
    this.isLoggedInAsGuest = true;
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.isLoggedInAsGuest = false;
    this.router.navigate(['/']);
  }
}
