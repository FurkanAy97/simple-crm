import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  allExampleProducts: any[] = [
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

  allProducts: any[];
  isKnown: any;

  constructor() {
    this.checkIfKnownUser()
  }

  async uploadExampleProductsToFirebase() {
    const db = getFirestore();

    try {
      const productsCollection = collection(db, 'products');

      // Clear existing data in the collection
      await this.clearCollection(db, productsCollection);


      // Upload example products to Firebase
      for (const product of this.allExampleProducts) {
        await setDoc(doc(productsCollection, product.id.toString()), product);
      }

      console.log('Example products uploaded to Firebase.');
    } catch (error) {
      console.error('Error uploading example products to Firebase:', error);
    }
  }

  async clearCollection(db: any, collectionRef: any) {
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    console.log('Collection cleared.');
  }


  getProducts() {
    return this.allProducts;
  }

  getSales(productId: number) {
    // Assuming each product has a unique ID
    const product = this.allProducts.find(p => p.id === productId);
    return product.sales;
  }

  getBestProduct() {
    if (this.allProducts.length > 0) {
      const productWithHighestSales = this.allProducts.reduce((maxSalesProduct, currentProduct) => {
        return currentProduct.sales > maxSalesProduct.sales ? currentProduct : maxSalesProduct;
      });
      console.log("Produkt mit den höchsten Verkaufszahlen:", productWithHighestSales.name);
      return productWithHighestSales.name
    } else {
      console.log("Kein Produkt gefunden.");
    }
  }

  getRevenue() {
    // Using the reduce function to sum up the sales numbers
    const totalRevenue = this.allProducts.reduce((sum, product) => {
      return sum + product.sales;
    }, 0);

    console.log("Gesamtumsatz:", totalRevenue);
    return totalRevenue;

  }

  checkIfKnownUser() {
    this.loadKnownState(); // Add parentheses to call the method
    if (!this.isKnown) {
      this.allProducts = this.allExampleProducts;
    } else {
      this.saveKnownState();
    }
  }

  private loadKnownState() {
    const storedKnownState = localStorage.getItem('isKnown');
    if (storedKnownState) {
      this.isKnown = true;
    } else {
      this.isKnown = false;
    }
  }

  private saveKnownState() {
    localStorage.setItem('isKnown', 'true');
  }
}
