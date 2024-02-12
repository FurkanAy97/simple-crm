import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.scss']
})
export class DialogEditProductComponent {
  productForm: FormGroup;
  loading: Boolean = false;

  productName: string;
  productPrice: number;
  productSales: number;
  productID: number; 

  firestore = getFirestore();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {

    this.productForm = this.fb.group({
      productname: [data.product ? data.product.name : '', Validators.required],
      productprice: [data.product ? data.product.price : '', [Validators.required, Validators.min(0)]],
      productsales: [data.product ? data.product.sales : '', [Validators.required, Validators.min(0)]],
    });

    this.productName = this.productForm.get('productname').value;
    this.productPrice = this.productForm.get('productprice').value;
    this.productSales = this.productForm.get('productsales').value;

    this.productID = this.data.product ? this.data.product.id : null;
  }

  async saveProductEdit() {
    try {
      this.loading = true;

      if (this.productForm.invalid) {
        throw new Error('Please fill all required information.');
      }

      const updatedProduct = {
        name: this.productForm.value.productname,
        price: this.productForm.value.productprice,
        sales: this.productForm.value.productsales,
        id: this.productID,
      };


      if (!this.isValidNumber(updatedProduct.price) || !this.isValidNumber(updatedProduct.sales)) {
        this.loading = false;
        throw new Error('Product price and sales must be positive numbers.');
      }


      const productId = this.productID;



      if (productId !== undefined && productId !== null) {

        this.productName = updatedProduct.name;
        this.productPrice = updatedProduct.price;
        this.productSales = updatedProduct.sales;

        const productDocRef = doc(this.firestore, 'products', productId.toString());

        await setDoc(productDocRef, updatedProduct);

        const index = this.productService.allProducts.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.productService.allProducts[index] = updatedProduct;
        }

        this.dialogRef.close();
      } else {
        this.loading = false;
        throw new Error('Product ID is undefined.');
      }
    } catch (error) {
      this.snackBar.open(error.message || 'Please fill all information.', 'Close', {
        duration: 3000,
      });
      this.loading = false;
    } finally {
      this.loading = false;
    }
  }

  isValidNumber(value: any): boolean {
    return typeof value === 'number' && value >= 0;
  }
}
