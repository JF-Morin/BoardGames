import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Directives
import { MismatchValidatorDirective } from './Directives/mismatch-validator.directive';

// Pipes
import { DocPipe } from './Pipes/doc.pipe';
import { PlayerAllReadyPipe } from './Pipes/player-all-ready.pipe';
import { HasJoinedGamePipe } from './Pipes/has-joined-game.pipe';
import { IsReadyPipe } from './Pipes/is-ready.pipe';
import { IsLeaderPipe } from './Pipes/is-leader.pipe';

// Components
import { BoardGamesComponent } from './Components/board-games/board-games.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { BoardComponent } from './Components/board/board.component';
import { InfoBarComponent } from './Components/info-bar/info-bar.component';
import { PlayersComponent } from './Components/Games/Shared/players/players.component';

// Material.Angular.io
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Catan components
import { GameCatanComponent } from './Components/Games/game-catan/game-catan.component';
import { GameSpeedyWordsComponent } from './Components/Games/game-speedy-words/game-speedy-words.component';
import { GameForbiddenIslandComponent } from './Components/Games/game-forbidden-island/game-forbidden-island.component';




const firebaseConfig = {
  apiKey: "AIzaSyDR9KNhLyJbPgp0YLS4QcFpLORpGxaqOa8",
  authDomain: "boardgames-bfd02.firebaseapp.com",
  databaseURL: "https://boardgames-bfd02.firebaseio.com",
  projectId: "boardgames-bfd02",
  storageBucket: "boardgames-bfd02.appspot.com",
  messagingSenderId: "875699659347",
  appId: "1:875699659347:web:9befa91747e0beaed1dca6",
  measurementId: "G-949TKCQG6Q"
};


@NgModule({
  declarations: [
    AppComponent,
    BoardGamesComponent,
    ProfileComponent,
    HomeComponent,
    BoardComponent,
    GameCatanComponent,
    MismatchValidatorDirective,
    InfoBarComponent,
    DocPipe,
    PlayerAllReadyPipe,
    HasJoinedGamePipe,
    IsReadyPipe,
    IsLeaderPipe,
    PlayersComponent,
    GameSpeedyWordsComponent,
    GameForbiddenIslandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatMenuModule,
    MatTooltipModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
