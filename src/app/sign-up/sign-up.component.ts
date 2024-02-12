import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hidePassword = true;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.email.setValue(this.authService.newCreatedEmail);
  }

  signUp() {
    if (this.password.valid) {
      this.authService
        .signUpWithEmailAndPassword(
          this.email.value,
          this.password.value,
          this.firstName.value,
          this.lastName.value
        )
        .then((user) => {
          this.emptyFields();
          this.snackBar.open('You have successfully signed up.', 'Close', {
            duration: 3000,
          });
        });
    } else {
      this.snackBar.open('Password should be at least 6 characters', 'Close', {
        duration: 4000,
      });
      this.password.setValue('');
    }
  }

  emptyFields() {
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.email.setValue('');
    this.password.setValue('');
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'This field is required.';
    }
  
    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }
  
    if (/\d/.test(control.value)) {
      return 'Numbers are not allowed in this field.';
    }
  
    return '';
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
