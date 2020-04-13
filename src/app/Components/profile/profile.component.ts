import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { AuthService } from 'src/app/Services/auth.service';
import * as _moment from 'moment';
import { StorageService } from 'src/app/Services/storage.service';
const moment = _moment;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {

  user: any;
  photo: any;

  constructor(public auth: AuthService, private usersService: UsersService, private storage: StorageService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe( user => {
      this.user = user;
    });

  }

  save(){
    if(this.photo){
      try {
          const task = this.storage.updateDocument(`users/${this.user.id}`, this.photo);
          task.then( a => {
            a.ref.getDownloadURL().then( v =>{
              this.user.photoURL = v;
              this.user.displayName = this.user.name + ' ' + this.user.lastName;
              const response = this.usersService.updateUser(`users/${this.user.id}`, this.user);
              console.log('Saving profile with photo succeeded: ' + response);
            })
          })
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        this.user.displayName = this.user.name + ' ' + this.user.lastName;
        const response = this.usersService.updateUser(`users/${this.user.id}`, this.user);
        console.log('Saving profile succeeded: ' + response);
      } catch (err) {
        console.log(err);
      }
    }
    
    this.photo = null;
    document.getElementById('profile').style.visibility = 'hidden'
  }

  cancel(){
    this.photo = null;
    document.getElementById('profile').style.visibility = 'hidden';
  }

  photoToUpload(event: any) {
    this.photo = event.target.files[0];
    // Display photo in register form
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('profile-avatar').setAttribute('src', e.target.result.toString());
    };
    reader.readAsDataURL(this.photo);
  }

  momentJSGetStringDate(date: any){
    return moment.unix(date.seconds).toISOString();
  }

}
