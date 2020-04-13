import { Component, OnInit } from '@angular/core';
import { GameLibraryService } from 'src/app/Services/game-library.service';
import { Game } from 'src/app/Interfaces/game.model';
import { User } from 'src/app/Interfaces/user.model';
import { OngoingGame } from 'src/app/Interfaces/ongoing-game.model';
import { OngoingGamesService } from 'src/app/Services/ongoing-games.service';
import { AuthService } from 'src/app/Services/auth.service';
import * as moment from 'moment';
import { FirestoreService } from 'src/app/Services/firestore.service';
import { UsersService } from 'src/app/Services/users.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  user: any;
  users: User[];
  gameLibrary: any[];
  ongoingGames: any[];

  selectedGameToAdd = {
    'id': '',
    'title': '',
    'description': '',
    'minPlayers': 0,
    'maxPlayers': 0,
    'prefixURL': '',
    'photoURL': '',
  }

  constructor(private gameLibraryService: GameLibraryService, private ongoingGameService: OngoingGamesService, private auth: AuthService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    
    this.auth.user$.subscribe( user => {
      this.user = user;
      console.log(this.user.inGameLink);
      if (this.user.inGameLink) {
        console.log('Ready to route');
        this.router.navigate([this.user.inGame]);
      }
    });
    this.usersService.users$.subscribe(users => {
      this.users = users;
    });
    this.gameLibraryService.gameLibrary$.subscribe(games => {
      this.gameLibrary = games;
    });
    this.ongoingGameService.ongoingGames$.subscribe(ongoingGames => {
      this.ongoingGames = ongoingGames;
    });

  }

  ngOnDestroy(): void {}

  // Ongnoing games card button
  ongoingGameReadyBtn(ongoingGame: any){
    let game = ongoingGame;
    let gameID = game.id;
    let userIndex = game.players.findIndex(element => {
      return element.userID === this.user.id;
    });
    game.players[userIndex].readyToStart = true;
    this.ongoingGameService.updateGame(`ongoing-games/${gameID}`, game);
  }

  ongoingGameNotReadyBtn(ongoingGame: any){
    let game = ongoingGame;
    let gameID = game.id;
    let userIndex = game.players.findIndex(element => {
      return element.userID === this.user.id;
    });
    game.players[userIndex].readyToStart = false;
    this.ongoingGameService.updateGame(`ongoing-games/${gameID}`, game);
  }

  ongoingGameJoinBtn(ongoingGame: any){
    let game = ongoingGame;
    let gameID = game.id;
    document.getElementById('add-btn').classList.remove('add-btn-icon-rotate');
    document.getElementById('game-menu').classList.add('hide-game-menu');
    game.players.push({'userID':this.user.id, 'ready': false});
    this.ongoingGameService.updateGame(`ongoing-games/${gameID}`, game);
    this.user.inGame = true;
    this.usersService.updateUser(`users/${this.user.id}`, this.user);
  }

  ongoingGameLeaveBtn(ongoingGame: any){
    let game = ongoingGame;
    let gameID = game.id;
    let userIndex = game.players.findIndex(element => {
      return element.userID === this.user.id;
    });
    game.players.splice(userIndex,1);
    this.ongoingGameService.updateGame(`ongoing-games/${gameID}`, game);
    this.user.inGame = null;
    this.user.inGameLink = null;
    this.usersService.updateUser(`users/${this.user.id}`, this.user);
  }

  ongoingGameCancelBtn(ongoingGame: any){
    let game = ongoingGame;
    let gameID = game.id;
    
    game.players.forEach(player => {
      this.usersService.updateUser(`users/${player.id}`, {'inGame': false,'inGameLink':null});
    });
    // this.user.inGame = false;
    // this.user.inGameLink = null;
    // this.usersService.updateUser(`users/${this.user.id}`, this.user);

    this.ongoingGameService.deleteGame(`ongoing-games/${gameID}`);
  }

  ongoingGamePlayBtn(ongoingGame: any){
    let game =ongoingGame;
    let gameID = game.id;
    game.start = moment().format();
    this.ongoingGameService.updateGame(`ongoing-games/${gameID}`, game);
    game.players.forEach(player => {
      this.usersService.updateUser(`users/${player.id}`, {'inGameLink': `ongoing-games/${gameID}`});
    });
  }

  // Modal related functions
  modalNewGame(game: any){
    this.selectedGameToAdd = game;
    document.getElementById('game-modal').style.visibility = 'visible';
    document.getElementById('add-game-modal').style.transform = 'scale(1)';
  }

  async addGameModalCreate(){
    let newOngoingGame: OngoingGame = {
      libraryGameID: this.selectedGameToAdd.id,
      players: [{"userID": this.user.id, 'readyToStart':false, 'score':0}],
      gameLeaderID: this.user.id,
      start: '',
      end: '',
      createdAt: moment().format(),
      gameSpecific: '',
      gameParameters: {'deckSize': 60, 'secondsToAnswer': 3},
      maxAcceptedPlayers: this.selectedGameToAdd.maxPlayers,
    }
    const gameID = await this.ongoingGameService.createGame(newOngoingGame);
    this.user.inGame = this.selectedGameToAdd.prefixURL + '/' + gameID;
    this.usersService.updateUser(`users/${this.user.id}`, this.user);
    document.getElementById('add-btn').classList.toggle('add-btn-icon-rotate');
    document.getElementById('game-menu').classList.toggle('hide-game-menu');
    document.getElementById('game-modal').style.visibility = 'hidden';
    document.getElementById('add-game-modal').style.transform = 'scale(0.8)';
  }

  addGameModalCancel(){
    document.getElementById('add-btn').classList.toggle('add-btn-icon-rotate');
    document.getElementById('game-menu').classList.toggle('hide-game-menu');
    document.getElementById('game-modal').style.visibility = 'hidden';
    document.getElementById('add-game-modal').style.transform = 'scale(0.8)';
  }

  // Sorting
  orderBy(field: string, order?: string){
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[field] === 'string') ? a[field].toUpperCase() : a[field];
      const varB = (typeof b[field] === 'string') ? b[field].toUpperCase() : b[field];

  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  // Button animation
  addBtnClick(){
    document.getElementById('add-btn').classList.toggle('add-btn-icon-rotate');
    document.getElementById('game-menu').classList.toggle('hide-game-menu');
  }
}

