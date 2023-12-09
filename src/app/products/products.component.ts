import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProducts: any[] = [{
    'name': 'Reusable Water Bottles',
    'price': 11,
  }, {
    'name': 'Customizable Phone Cases',
    'price': 25,
  },{
    'name': 'Scented Candles',
    'price': 17,
  },{
    'name': 'Notebook and Pen Sets',
    'price': 16,
  },{
    'name': 'Cooking Utensil Set',
    'price': 23,
  }];
}
