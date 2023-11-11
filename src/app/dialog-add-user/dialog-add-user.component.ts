import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  
  user = new User();
  birthDate: any;
  
  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
  }

}
