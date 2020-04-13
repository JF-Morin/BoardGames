import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service'
import { OngoingGame } from '../Interfaces/ongoing-game.model';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OngoingGamesService {

  ongoingGamesCollection$: AngularFirestoreCollection<OngoingGame>;
  ongoingGames$: Observable<OngoingGame[]>;

  constructor(private firestoreService: FirestoreService) {
    this.ongoingGamesCollection$ = this.firestoreService.collection('ongoing-games');
    this.ongoingGames$ = this.firestoreService.collectionWithIDs$('ongoing-games');
  }

  async createGame(game: OngoingGame){
    try {
      const response = await this.ongoingGamesCollection$.add(game);
      console.log('Ongoing game ID created: ');
      console.log(response.id);
      return response.id;
    } catch (err) {
      console.log('Error creating the game: ' + err);
      return err;
    }
  }

  async updateGame(gameRef: string, game: OngoingGame){
    try{
      const response = await this.firestoreService.document(gameRef).update(game);
      console.log('Ongoing game updated: ' + response);
      return response;
    } catch(err) {
      console.log('Error updating the game: ' + err);
      return err;
    }
  }

  async deleteGame(gameRef: string){
    try{
      const response = await this.firestoreService.document(gameRef).delete();
      console.log('Ongoing game deleted: ' + response);
      return response;
    } catch(err) {
      console.log('Error deleting the game: ' + err);
      return err;
    }
  }

  getGame(gameRef: string): Observable<OngoingGame>{
    try{
      const response = this.firestoreService.document$(gameRef) as Observable<OngoingGame>;
      console.log('GET Ongoing game: ' + response);
      return response;
    } catch(err) {
      console.log('Error getting the game: ' + err);
      return err;
    }
  }
}
