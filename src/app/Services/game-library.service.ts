import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service'
import { Game } from '../Interfaces/game.model';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  private gameLibraryCollection$: AngularFirestoreCollection<Game>;
  gameLibrary$: Observable<Game[]>;

  constructor(private firestoreService: FirestoreService) {
    this.gameLibraryCollection$ = this.firestoreService.collection('game-library');
    this.gameLibrary$ = this.firestoreService.collectionWithIDs$('game-library');
  }

  async addGameToLibrary(game: Game){
    try {
      const response = await this.gameLibraryCollection$.add(game);
      console.log('Game added to library' + response);
      return response;
    } catch (err) {
      console.log('Error creating the game: ' + err);
      return err;
    }
  }

  // get gameLibrary$(): Observable<Game[]> {
  //   return this.gameLibrary$;
  // }

}
