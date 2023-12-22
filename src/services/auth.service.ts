import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth;

  constructor(@Inject(FirebaseApp) private firebaseApp: FirebaseApp) {
    // Access the AngularFire Auth service using the injected FirebaseApp
    this.auth = getAuth(firebaseApp);
  }

  async signUpWithEmailAndPassword(email: string, password: string, displayName?: string, photoURL?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Update user profile if displayName and/or photoURL are provided
      if (displayName || photoURL) {
        await updateProfile(user, { displayName, photoURL });
      }
      return user;
    } catch (error) {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
      throw error; // Rethrow the error for further handling if needed
    }
  }
}
