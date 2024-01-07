import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isKnown: boolean = false;


  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private productService: ProductService) {
    authService.isLoggedIn = false
  }


  ngOnInit() {
    if (this.authService.newCreatedEmail) {
      this.email = this.authService.newCreatedEmail;
    }
  }


  async onSubmit() {
    this.productService.checkIfKnownUser();
    try {
      await this.authService.loginWithEmailAndPassword(this.email, this.password).then(() => {
        this.productService.checkIfKnownUser()
        this.snackBar.open('You have successfully logged in.', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/dashboard']);
        this.productService.saveKnownState()
      })
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        this.snackBar.open('Invalid email or password. Please try again.', 'Close', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('An error occurred. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    }
  }


  async handleGuestLogin() {
    try {
      await this.productService.checkIfKnownUser();
      this.authService.guestLogin();
      this.productService.saveKnownState();
        this.snackBar.open('You have successfully logged in as a Guest.', 'Close', {
            duration: 3000,
        });
    } catch (error) {
        console.error('Error during guest login:', error);
    }
}

}



