import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  loading: boolean = false;
  userForm: FormGroup;
  user: any;
  userID: any;
  firestore = getFirestore();

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      street: [this.user.street, Validators.required],
      zipCode: [this.user.zipCode, [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: [this.user.city, Validators.required],
    });
  }

  async saveUser() {
    this.loading = true;

    try {
      if (this.userForm.valid) {
        const formData = this.userForm.value;

        await updateDoc(doc(this.firestore, "users", this.userID), {
          street: formData.street,
          zipCode: formData.zipCode,
          city: formData.city
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }
}
