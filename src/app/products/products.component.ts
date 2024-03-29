import { Component } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private productService: ProductService, public dialog: MatDialog) {
    this.initialize();
  }

  allProducts: any[];

  openDialog(): void {
    this.dialog.open(DialogAddProductComponent);
  }

  openEditDialog(product: any): void {
    this.dialog.open(DialogEditProductComponent, {
      data: { product: product } 
    });
  }

  private async initialize() {
    await this.productService.downloadProducts();
    this.allProducts = this.productService.allProducts;
  }
}
