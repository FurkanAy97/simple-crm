import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isKnown: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private productService: ProductService, private userService: UserService) {
    authService.isLoggedIn = false
  }


  async ngOnInit() {
    if (this.authService.newCreatedEmail) {
      await this.authService.loginWithEmailAndPassword(this.email.value, this.password.value)

    }
  }


  async onSubmit() {
    await this.productService.checkIfKnownUser();
    await this.userService.checkIfKnownUser();
    try {
      await this.authService.loginWithEmailAndPassword(this.email.value, this.password.value).then(() => {
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
    await this.productService.checkIfKnownUser();
    await this.userService.checkIfKnownUser();
    try {
      await this.authService.guestLogin()
      this.snackBar.open('You have successfully logged in as a Guest.', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/dashboard']);
      this.productService.saveKnownState();
    } catch (error) {
      console.error('Error during guest login:', error);
    }
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'This field is required.';
    }
  
    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }
  
    // Check if there are any numbers in the input
    if (/^\D+$/.test(control.value)) {
      return 'Numbers are not allowed in this field.';
    }
  
    return '';
  }
}



