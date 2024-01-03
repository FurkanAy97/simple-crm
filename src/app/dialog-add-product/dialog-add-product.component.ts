import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { ProductService } from 'src/services/product.service';


@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})
export class DialogAddProductComponent {
  loading: boolean = false;
  productname: string = '';
  productPrice: number = 0;  // Add other product details as needed

  firestore = getFirestore();
  product: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private productService: ProductService
  ) {}

  async saveProduct() {
    try {
      this.loading = true;

      // Create a new product object
      const newProduct = {
        name: this.productname,
        price: this.productPrice,
        id: this.productService.allProducts.length, // Generate a new unique ID
        sales: 0 // Initial sales set to 0
      };

      // Add the new product to the local array
      this.productService.allProducts.push(newProduct);

      // Save the new product to Firestore
      const productDocRef = doc(this.firestore, 'products', newProduct.id.toString());
      await setDoc(productDocRef, newProduct);

      // Reset form fields
      this.productname = '';
      this.productPrice = 0;

      // Close the dialog
      this.dialogRef.close();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      this.loading = false;
    }
  }


}
