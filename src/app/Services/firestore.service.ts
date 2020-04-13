import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocumentPredicate<T>   = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) {}

  collection<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref
  }

  document<T>(ref: DocumentPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc(ref) : ref
  }

  /* **************** */
  // Get Data
  /* **************** */

  collection$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.collection(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map (doc => doc.payload.doc.data()) as T[];
      })
    );
  }

  document$<T>(ref: DocumentPredicate<T>): Observable<T> {
    return this.document(ref).snapshotChanges().pipe(
      map(doc => {
        return doc.payload.data() as T;
      })
    );
  }

  collectionWithIDs$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.collection(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map (doc => {
          const id = doc.payload.doc.id;
          const data = doc.payload.doc.data();
          return {id, ...data} as T;
        })
      })
    );
  }

  documentWithID$<T>(ref: DocumentPredicate<T>): Observable<T> {
    return this.document(ref).snapshotChanges().pipe(
      map(doc => {
          const id = doc.payload.id;
          const data = doc.payload.data();
          return {id, ...data} as T;
      })
    );
  }

}
