import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './Guards/auth.guard';

//Components
import { BoardGamesComponent } from './Components/board-games/board-games.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { BoardComponent } from './Components/board/board.component';

// Games
import { GameCatanComponent } from './Components/Games/game-catan/game-catan.component';
import { GameSpeedyWordsComponent } from './Components/Games/game-speedy-words/game-speedy-words.component';
import { GameForbiddenIslandComponent } from './Components/Games/game-forbidden-island/game-forbidden-island.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boardgames', component: BoardGamesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: BoardComponent },
      { path: 'catan/:id', component: GameCatanComponent },
      { path: 'speedy-words/:id', component: GameSpeedyWordsComponent },
      { path: 'forbidden-island/:id', component: GameForbiddenIslandComponent },
      
    ] 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
