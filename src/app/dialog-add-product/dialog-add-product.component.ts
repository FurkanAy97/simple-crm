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
  productPrice: number = 0;

  firestore = getFirestore();
  product: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private productService: ProductService
  ) {}

  async saveProduct() {
    try {
      this.loading = true;

      const newProduct = {
        name: this.productname,
        price: this.productPrice,
        id: this.productService.allProducts.length,
        sales: 0
      };

      this.productService.allProducts.push(newProduct);

      const productDocRef = doc(this.firestore, 'products', newProduct.id.toString());
      await setDoc(productDocRef, newProduct);

      this.productname = '';
      this.productPrice = 0;

      this.dialogRef.close();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      this.loading = false;
    }
  }


}
