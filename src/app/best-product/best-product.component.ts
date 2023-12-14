import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.scss']
})
export class BestProductComponent {
  topProduct: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.topProduct = this.productService.getBestProduct();
    console.log(this.topProduct);
  }


}
