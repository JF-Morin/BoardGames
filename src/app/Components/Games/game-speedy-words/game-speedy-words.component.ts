import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UsersService } from 'src/app/Services/users.service';
import { OngoingGame } from 'src/app/Interfaces/ongoing-game.model';
import { User } from 'src/app/Interfaces/user.model';
import { OngoingGamesService } from 'src/app/Services/ongoing-games.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-game-speedy-words',
  templateUrl: './game-speedy-words.component.html',
  styleUrls: ['./game-speedy-words.component.sass']
})
export class GameSpeedyWordsComponent implements OnInit {
  
  user: any;
  users: User[];
  game: OngoingGame;
  gameID: string;

  constructor(private auth: AuthService, private usersService: UsersService, private ongoingGameService: OngoingGamesService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.gameID = this.route.snapshot.paramMap.get('id');
    this.auth.user$.subscribe( user => {
      this.user = user;
    });

    this.usersService.users$.subscribe( users => {
      this.users = users;
    });

    this.ongoingGameService.getGame(`/ongoing-games/${this.gameID}`).subscribe(game => {
      this.game = game;
    });



  }

  flipCard(cardNumber:number){

    if(this.user.uid === this.game.gameLeaderID) {
      // const flipCardCallableFunction = firebase.functions().httpsCallable('flipCard');
      // flipCardCallableFunction({'ongoing-game': this.game, 'cardToFlipID': cardNumber});
      // console.log('Flip Card!');
      let newGameState = this.game;
      newGameState.gameSpecific.cardDeck[cardNumber].flip = true;
      this.ongoingGameService.updateGame(`ongoing-games/${this.gameID}`, newGameState);
    }

    
    
  }

  // flipCardAnimation(cardNumber:number){
  //   document.getElementById(`card-inner-${cardNumber}`).style.transform = 'rotateY(180deg)';
  //   document.getElementById(`card-${cardNumber}`).style.transform = 'translate(416px, ' + (cardNumber*2) + 'px)';
  //   // console.log('translate(416px, ' + (cardNumber*2) + 'px)');
  //   setTimeout(()=>{
  //     document.getElementById(`card-${cardNumber}`).style.zIndex = 'calc(63 - ' + cardNumber + ')';
  //   },600);
  // }


  borderColor(color: string): string{
    if(color === 'orange') return '#ff6500';
    else if(color === 'blue') return '#007fff';
    else if(color === 'green') return '#39ff14';
    else return '#00000050';
  }

  iconFromCategory(category: string): string {
    // ['animal','city','country','famous-person','profession','object','plant-tree','food','name-boy-girl','tv-series-film'];
    if(category === 'animal')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fanimal.png?alt=media&token=799685ba-b64b-4d3f-8622-bcf3dd1b4997';
    else if(category === 'city')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fcity.png?alt=media&token=b536b3e5-8b8a-4494-a1e0-cfb75601d659';
    else if(category === 'country')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fcountry.png?alt=media&token=98aa0d88-dfcd-45a5-a8b6-6f61493b3856';
    else if(category === 'famous-person')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Ffamous-person.png?alt=media&token=6a6914f9-ec4f-493d-a674-a5fe5ab4cae8';
    else if(category === 'profession')
      return'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fprofession.png?alt=media&token=d57337fa-9036-4ad7-bfd3-e2c75cf943d9';
    else if(category === 'object')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fobject.png?alt=media&token=ff71eb4c-08f7-4cb3-b368-efe57d85219d';
    else if(category === 'plant-tree')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fplant-tree.png?alt=media&token=4d048304-0c09-4c59-aa1f-ddd5b5d5b5d8';
    else if(category === 'food')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Ffood.png?alt=media&token=73fa7b96-0d85-47d0-8462-81d7195b129e';
    else if(category === 'name-boy-girl')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Fboy-girl-name.png?alt=media&token=0dd98564-c0d3-4953-be76-496fa5656642';
    else if(category === 'tv-series-film')
      return 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/games%2FSpeedy-Words%2Ftv-series-film.png?alt=media&token=1e973e22-e401-4316-b0ff-b5a3d8eef97b';
    else return '';
  }

}
