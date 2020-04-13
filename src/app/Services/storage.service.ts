import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string> = of(null);

  constructor(private storage: AngularFireStorage) { }

  addDocument(documentRef: string, newDocument: any): AngularFireUploadTask{
    // const fileRef = this.storage.ref(documentRef);
    const task = this.storage.upload(documentRef, newDocument);
    return task;
  }

  updateDocument(documentRef: string, newDocument: any): AngularFireUploadTask{
    const task = this.storage.upload(documentRef, newDocument);
    return task;
  }
}
