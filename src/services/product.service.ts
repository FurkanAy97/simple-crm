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
  isKnown: boolean;
  db = getFirestore();
  loading: boolean;
  constructor() {
  }

  async checkIfKnownUser() {
    let knownState = localStorage.getItem('isKnown')
    if (knownState !== 'true') {
      console.log('User is not known');
      await this.uploadExampleProductsToFirebase()
    }
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
        ;
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


