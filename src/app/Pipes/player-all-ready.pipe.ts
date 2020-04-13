import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerAllReady'
})
export class PlayerAllReadyPipe implements PipeTransform {

  transform(ongoingGame: any): boolean {
    return ongoingGame.players.every(player => {
      return player.readyToStart == true;
    });
  }

}
