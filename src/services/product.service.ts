import { Injectable } from '@angular/core';
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
      'sales': 32
    },
    {
      'name': 'Customizable Phone Cases',
      'price': 25,
      'id': 1,
      'sales': 28
    },
    {
      'name': 'Scented Candles',
      'price': 17,
      'id': 2,
      'sales': 17
    },
    {
      'name': 'Notebook and Pen Sets',
      'price': 16,
      'id': 3,
      'sales': 28
    },
    {
      'name': 'Cooking Utensil Set',
      'price': 23,
      'id': 4,
      'sales': 35
    },
    {
      'name': 'Portable Bluetooth Speakers',
      'price': 40,
      'id': 5,
      'sales': 18
    },
    {
      'name': 'Organic Tea Sampler',
      'price': 19,
      'id': 6,
      'sales': 27
    },
    {
      'name': 'Fitness Resistance Bands Set',
      'price': 30,
      'id': 7,
      'sales': 34
    },
    {
      'name': 'Aromatherapy Essential Oils Kit',
      'price': 22,
      'id': 8,
      'sales': 39
    },
    {
      'name': 'Stylish Desk Organizer',
      'price': 28,
      'id': 9,
      'sales': 22
    }
  ];

  allProducts: any[];
  isKnown: boolean;
  db = getFirestore();
  loading: boolean;
  constructor() {
  }

  async checkIfKnownUser(): Promise<void> {
    return new Promise(async (resolve) => {
      let knownState = localStorage.getItem('isKnown');
      if (knownState !== 'true') {
        console.log('User is not known');
        await this.uploadExampleProductsToFirebase();
      }
      resolve();
    });
  }

  saveKnownState() {
    localStorage.setItem('isKnown', 'true');
    this.isKnown = true
    console.log('Saved isKnown state to localStorage.');
  }

  async uploadExampleProductsToFirebase() {

    try {
      const productsCollection = collection(this.db, 'products');
      this.loading = true
      console.log(this.loading);

      await this.clearCollection(this.db, productsCollection);

      for (const product of this.allExampleProducts) {
        await setDoc(doc(productsCollection, product.id.toString()), product);
      }
      console.log('Example products uploaded to Firebase.');
      this.loading = false
      console.log(this.loading);
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

  async downloadProducts() {
    const productsCollection = collection(this.db, 'products');
    try {
      const querySnapshot = await getDocs(productsCollection);
      this.allProducts = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        this.allProducts.push(productData);
      })
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  getProducts() {
    return this.allProducts;
  }

  getSales(productId: number) {
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
    const totalRevenue = this.allProducts.reduce((sum, product) => {
      return sum + product.sales;
    }, 0);
    return totalRevenue;
  }
}


