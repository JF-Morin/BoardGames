import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Interfaces/user.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.sass']
})
export class PlayersComponent implements OnInit {

  @Input() players: any[];
  @Input() gameLeaderID: string;

  users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.users$.subscribe( users => {
      this.users = users;
    });
  }

}
