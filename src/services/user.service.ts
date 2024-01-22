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

  constructor() {}

  async checkIfKnownUser(): Promise<void> {
    return new Promise(async (resolve) => {
      let knownState = localStorage.getItem('isKnown');
      if (knownState !== 'true') {
        await this.uploadExampleUsersToFirebase();
      }
      resolve();
    });
  }

  async uploadExampleUsersToFirebase() {

    try {
      const userCollection = collection(this.firestore, 'users');
      this.loading = true
      await this.clearCollection(this.firestore, userCollection);
      for (const user of this.exampleUsers.usersArray) {
        await setDoc(doc(userCollection), user);
      }
      this.loading = false
    } catch (error) {
      console.error('Error uploading example products to Firebase:', error);
    }
  }

  async clearCollection(db: any, collectionRef: any) {
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  async downloadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    try {
      const querySnapshot = await getDocs(usersCollection);
      this.allUsers = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        this.allUsers.push(userData);
      })

    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }
}
