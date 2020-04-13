import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isReady'
})
export class IsReadyPipe implements PipeTransform {

  transform(user: any, ongoingGame: any): boolean {
    let player: any;
    player = ongoingGame.players.find(player => {
        return player.userID === user.id;
    });
    return player.readyToStart;
  }

}
