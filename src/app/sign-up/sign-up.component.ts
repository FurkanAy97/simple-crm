import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class SignUpComponent {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordError: string | null = null;
  isPasswordTooShort: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  signUp() {
    if (this.password.length > 5) {
      this.authService.signUpWithEmailAndPassword(this.email, this.password, this.firstName, this.lastName)
        .then((user) => {
          console.log('User signed up:', user);
          this.emptyFields()
          this.snackBar.open('You have successfully signed up.', 'Close', {
            duration: 3000, // 3 seconds
          });
        })
    } else {
      this.snackBar.open('Password should be at least 6 characters', 'Close', {
        duration: 4000, // 3 seconds
      });
      this.password = ''
    }
  }

  
  ngOnInit() {
    this.email = this.authService.newCreatedEmail;
  }


  emptyFields() {
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.password = ''
  }
}
