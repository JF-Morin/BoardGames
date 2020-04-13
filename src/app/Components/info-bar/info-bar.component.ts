import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
// import { Observable } from 'rxjs';
// import { User } from '../../Interfaces/user.model'

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.sass']
})
export class InfoBarComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe( user => {
      this.user = user;
    });
  }

  showProfile(){
    document.getElementById('profile').style.visibility = 'visible';
  }

  signOut(){
    this.auth.signOut();
  }

}
