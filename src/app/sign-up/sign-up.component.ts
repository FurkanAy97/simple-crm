import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  formValues: { email: string } = { email: '' };

onSubmit() {
throw new Error('Method not implemented.');
}
openDialog() {
throw new Error('Method not implemented.');
}
  constructor(private authService: AuthService) {}

  signUp() {
    this.authService.signUpWithEmailAndPassword('user@example.com', 'password123')
      .then((user) => {
        console.log('User signed up:', user);
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
  }
}
