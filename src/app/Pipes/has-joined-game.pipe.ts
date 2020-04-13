import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasJoinedGame'
})
export class HasJoinedGamePipe implements PipeTransform {

  transform(user: any, ongoingGame: any): boolean {
    let playerIDs: string[];
    playerIDs = ongoingGame.players.map(player => {
        return player.userID;
    });
    return playerIDs.includes(user.id);
  }

}
