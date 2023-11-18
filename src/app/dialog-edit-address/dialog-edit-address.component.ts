import { BooleanInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  loading: boolean = false;
  user: any;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
  }
  saveUser() {
    throw new Error('Method not implemented.');
  }
}
