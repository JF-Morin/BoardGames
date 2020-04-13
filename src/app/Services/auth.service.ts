import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user.model'; // optional

import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { UsersService } from './users.service';

import { Observable, of } from 'rxjs';
import { switchMap, map, finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService, private usersService: UsersService,private router: Router, private storage: StorageService) { 

      this.user$ = this.afAuth.authState.pipe(
        switchMap(user=>{
          if(user){
            // return this.afs.doc<User>(`users/${user.uid}`).snapshotChanges().pipe(
            //   map(user => {
            //     const ref = user.payload.ref;
            //     const data = user.payload.data();
            //     return {ref, ...data};
            //     //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            //   })
            // );
            return this.firestoreService.documentWithID$(`users/${user.uid}`);
          } else {
            return of(null);
          }
        })
      );
    }

    // ******************************
    // Pour utiliser le Google SignIn, faut avoir un mot de passe specifique a l'application
    // Donc, demander a l'utilisateur de se faire un mot de passe, ou essayer en codant de le lier au compte Google
    // https://firebase.google.com/docs/auth/web/account-linking
    //
    // ******************************

    // async googleSignin() {
    //   const provider = new auth.GoogleAuthProvider();
    //   const credential = await this.afAuth.auth.signInWithPopup(provider);

    //   console.log('Google signin');
    //   console.log(credential.user);
    //   return credential.user;
    // }

    async emailSignin(email: string, password: string){
      try {
        const response = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        console.log('Login succeeded: ' + response.user.uid);
        return response;
      } catch (err) {
        console.log('Login error: ' + err);
        return err;
      }
    }

    async register(email: string, password: string, newUser: User, photoToUpload?: any){
      try{
        const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
        newUser.id = credential.user.uid;
        newUser.email = credential.user.email;
        console.log('Creating user with email/password succeeded: ' + credential);
        const response = await this.usersService.addUser(newUser);
        console.log('Updating new user succeeded: ' + response);

        if(photoToUpload){
          const task = this.storage.addDocument(`users/${newUser.id}`, photoToUpload);
          task.then( a => {
            a.ref.getDownloadURL().then( v =>{
              newUser.photoURL = v;
              const update = this.usersService.updateUser(`users/${newUser.id}`,newUser);
              console.log('Updating user with photo: ' + update);
            })
          })
        }


        return response;
      } catch (err) {
        console.log('Error registering user: ' + err);
        return err;
      }
    }
  
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['']);
    }

}