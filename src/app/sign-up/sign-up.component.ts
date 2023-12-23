import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { timeout } from 'rxjs';

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

  constructor(private authService: AuthService) {}

  signUp() {
    this.authService.signUpWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log('User signed up:', user);
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          this.isPasswordTooShort = true
          setTimeout(() => {
            this.isPasswordTooShort = false

          }, 4000);
        }
      });
  }


}
