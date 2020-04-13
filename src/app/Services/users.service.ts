import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service'
import { User } from '../Interfaces/user.model';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection$: AngularFirestoreCollection<User>;
  users$: Observable<User[]>

  constructor(private firestoreService: FirestoreService) {
    this.usersCollection$ = this.firestoreService.collection('users');
    this.users$ = this.firestoreService.collectionWithIDs$('users');
  }

  async addUser(user: User){
    try {
      const userRef: AngularFirestoreDocument<User> = await this.firestoreService.document(`users/${user.id}`);
      await userRef.set(user, { merge: true });
      console.log('Adding user succeeded: ' + userRef);
      return userRef;
    } catch (err) {
      console.log('Error creating user: ' + err);
      return err;
    }
  }

  async updateUser(userRef: string, user: any){
    try{
      await this.firestoreService.document(userRef).update(user);
      console.log('User updated: ' + userRef);
      return userRef;
    } catch (err) {
      console.log('Error updating user:' + err);
      return err;
    }
  }


  // async deleteUser(userRef: string){
  //   try{
  //     const response = await this.firestoreService.document(userRef).delete();
  //     console.log('User deleted: ' + response);
  //   } catch(err) {
  //     console.log('Error deleting the user: ' + err);
  //   }
  // }

}
