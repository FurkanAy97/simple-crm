import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { ExampleUsers } from 'src/models/exampleUsers.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = getFirestore();
  allUsers: any[] = [];
  exampleUsers = new ExampleUsers()
  birthDateObj: any;
  loading: boolean;
  
  constructor() { }

  async checkIfKnownUser(): Promise<void> {
    return new Promise(async (resolve) => {
      let knownState = localStorage.getItem('isKnown');
      if (knownState !== 'true') {
        console.log('User is not known');
        await this.uploadExampleUsersToFirebase();
      }
      resolve();
    });
  }

  async uploadExampleUsersToFirebase() {

    try {
      const userCollection = collection(this.firestore, 'users');
      this.loading = true
      console.log(this.loading);

      await this.clearCollection(this.firestore, userCollection);

      for (const user of this.exampleUsers.exampleUsersArray) {
        await setDoc(doc(userCollection), user);
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
}
