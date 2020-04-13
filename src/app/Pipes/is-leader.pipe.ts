import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLeader'
})
export class IsLeaderPipe implements PipeTransform {

  transform(user: any, ongoingGame: any): any {
    return user.id === ongoingGame.gameLeaderID;
  }

}
