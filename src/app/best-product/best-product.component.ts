import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.scss']
})
export class BestProductComponent {
  topProduct: string;
  totalRevenue: number;

  constructor(private productService: ProductService, public authService: AuthService) {}

  async ngOnInit() {
    await this.productService.downloadProducts(); 
    this.topProduct = this.productService.getBestProduct();
    this.totalRevenue = this.productService.getRevenue()
  }
}
