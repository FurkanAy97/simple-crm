import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})
export class DialogAddProductComponent {
  loading: boolean = false;
  productname: string = '';
  productPrice: number = 0;
  productSales: number = 0;

  firestore = getFirestore();

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ) {}

  async saveProduct() {
    try {
      this.loading = true;
      const newProduct = {
        name: this.productname,
        price: this.productPrice,
        id: this.productService.allProducts.length,
        sales: this.productSales
      };

      if (!this.isValidNumber(this.productPrice) || !this.isValidNumber(this.productSales)) {
        throw new Error('Product price and sales must be positive numbers.');
      }

      const productDocRef = doc(this.firestore, 'products', newProduct.id.toString());
      await setDoc(productDocRef, newProduct);

      this.productService.allProducts.push(newProduct);

      this.productname = '';
      this.productPrice = 0;
      this.productSales = 0;
      this.dialogRef.close();
    } catch (error) {
      this.snackBar.open(error.message || 'Please fill all information.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.loading = false;
    }
  }

  isValidProduct(product: any): boolean {
    return product.name && this.isValidNumber(product.price) && this.isValidNumber(product.sales);
  }

  isValidNumber(value: any): boolean {
    return typeof value === 'number' && value >= 0;
  }
}
