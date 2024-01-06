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

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private productService: ProductService) {}

  ngOnInit() {
    if (this.authService.newCreatedEmail) {
      this.email = this.authService.newCreatedEmail;
    }
  }

  async onSubmit() {
    this.productService.checkIfKnownUser();
    try {
      await this.authService.loginWithEmailAndPassword(this.email, this.password).then(() => {
        this.snackBar.open('You have successfully logged in.', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/dashboard']);
        this.productService.saveKnownState()
        this.productService.checkIfKnownUser()
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

  handleGuestLogin() {
    this.productService.checkIfKnownUser();
    this.authService.guestLogin()
    this.snackBar.open('You have successfully logged in as a Guest.', 'Close', {
      duration: 3000,
    });
    this.productService.saveKnownState()
  }



  
}



