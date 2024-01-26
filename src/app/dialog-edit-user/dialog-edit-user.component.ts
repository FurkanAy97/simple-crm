import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  loading: boolean = false;
  user: any = { firstName: '', lastName: '', email: '', birthDate: null }; // Add this line
  userForm: FormGroup;
  maxDate: Date = new Date();
  userID: any;
  firestore = getFirestore();

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private fb: FormBuilder) {
    this.maxDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      birthDate: [this.user.birthDate, Validators.required],
    });
  }

  async saveUser() {
    this.loading = true;
    await this.timeStampIntoDate();

    try {
      if (this.userForm.valid) {
        const formData = this.userForm.value;

        await updateDoc(doc(this.firestore, "users", this.userID), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  async timeStampIntoDate() {
    if (this.userForm.get('birthDate').value instanceof Date && !isNaN(this.userForm.get('birthDate').value.getTime())) {
      const formattedDate = this.userForm.get('birthDate').value.toISOString().split('T')[0];
      this.userForm.get('birthDate').setValue(formattedDate);
    }
  }
}
