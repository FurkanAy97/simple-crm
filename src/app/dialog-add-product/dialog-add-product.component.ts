import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})
export class DialogAddProductComponent {
  loading: boolean = false;
  productForm: FormGroup;

  firestore = getFirestore();

  constructor(
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      productname: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      productSales: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async saveProduct() {
    try {
      this.loading = true;

      if (this.productForm.invalid) {
        throw new Error('Please fill all required information.');
      }

      const newProduct = {
        name: this.productForm.value.productname,
        price: this.productForm.value.productPrice,
        id: this.productService.allProducts.length,
        sales: this.productForm.value.productSales
      };

      if (!this.isValidNumber(newProduct.price) || !this.isValidNumber(newProduct.sales)) {
        throw new Error('Product price and sales must be positive numbers.');
      }

      const productDocRef = doc(this.firestore, 'products', newProduct.id.toString());
      await setDoc(productDocRef, newProduct);

      this.productService.allProducts.push(newProduct);

      this.productForm.reset();

      this.dialogRef.close();
    } catch (error) {
      this.snackBar.open(error.message || 'Please fill all information.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.loading = false;
    }
  }

  isValidNumber(value: any): boolean {
    return typeof value === 'number' && value >= 0;
  }
}
