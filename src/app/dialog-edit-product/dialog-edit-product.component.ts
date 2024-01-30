import { BooleanInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Add necessary imports
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.scss']
})
export class DialogEditProductComponent {
  productForm: FormGroup; // Declare productForm variable
  loading: BooleanInput;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogEditProductComponent>) {
    // Initialize the form in the constructor
    this.productForm = this.fb.group({
      productname: ['', Validators.required], // Add validators if needed
      productprice: ['', Validators.required], // Add validators if needed
      // Add other form controls if needed
    });
  }

  saveProductEdit() {
    // Implement saveProductEdit logic
  }
}
