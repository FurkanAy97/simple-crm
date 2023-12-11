// product.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  allProducts: any[] = [
    {
      'name': 'Reusable Water Bottles',
      'price': 11,
      'id': 0,
      'sales': 1200
    },
    {
      'name': 'Customizable Phone Cases',
      'price': 25,
      'id': 1,
      'sales': 800
    },
    {
      'name': 'Scented Candles',
      'price': 17,
      'id': 2,
      'sales': 600
    },
    {
      'name': 'Notebook and Pen Sets',
      'price': 16,
      'id': 3,
      'sales': 1000
    },
    {
      'name': 'Cooking Utensil Set',
      'price': 23,
      'id': 4,
      'sales': 500
    },
    {
      'name': 'Portable Bluetooth Speakers',
      'price': 40,
      'id': 5,
      'sales': 300
    },
    {
      'name': 'Organic Tea Sampler',
      'price': 19,
      'id': 6,
      'sales': 750
    },
    {
      'name': 'Fitness Resistance Bands Set',
      'price': 30,
      'id': 7,
      'sales': 400
    },
    {
      'name': 'Aromatherapy Essential Oils Kit',
      'price': 22,
      'id': 8,
      'sales': 900
    },
    {
      'name': 'Stylish Desk Organizer',
      'price': 28,
      'id': 9,
      'sales': 600
    }
  ];

  getProducts() {
    return this.allProducts;
  }

  getSales(productId: number) {
    // Assuming each product has a unique ID
    const product = this.allProducts.find(p => p.id === productId);
    return product.sales;
  }
}
