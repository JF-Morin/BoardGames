import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../Services/auth.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Interfaces/user.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  // Login form
  loginForm: FormGroup;

  // Register form
  registerForm: FormGroup;
  registerPhotoToUpload: any;
  
  // State & message
  loading = false;
  success = false;
  error = false;
  message = '';

  constructor(public auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.auth.user$.subscribe( user => {
      if (user){
        this.router.navigate(['/boardgames']);
      }
    });

    // Login Form  Builder
    this.loginForm = this.formBuilder.group({
      email:    ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });

    // Register Form  Builder
    this.registerForm = this.formBuilder.group({
      'personalDetails': new FormGroup({
        'name':             new FormControl(null,[Validators.required, Validators.minLength(2)]),
        'lastName':         new FormControl(null,[Validators.required, Validators.minLength(2)]),
        'birthday':         new FormControl(null,[Validators.required]),
        'gender':           new FormControl(null,[Validators.required, Validators.pattern('^(F|M)')]),
      }),
      'photo': new FormGroup({
        'photo':            new FormControl(null),
      }),
      'emailPassword': new FormGroup({
        'email':            new FormControl(null,[Validators.required, Validators.email]),
        'password':         new FormControl(null,[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]),
        'confirmPassword':  new FormControl(null,[Validators.required]),
      })
    });

  }

  // Getters login form
  get loginEmail(){
    return this.loginForm.get('email');
  }

  get loginPassword(){
    return this.loginForm.get('password');
  }

  // Getters register form
  get registerEmail(){
    return this.registerForm.get('emailPassword').get('email');
  }

  get registerPassword(){
    return this.registerForm.get('emailPassword').get('password');
  }

  get registerConfirmPassword(){
    return this.registerForm.get('emailPassword').get('confirmPassword');
  }

  get registerPhoto(){
    return this.registerForm.get('photo').get('photo');
  }  

  get registerName(){
    return this.registerForm.get('personalDetails').get('name');
  }

  get registerLastName(){
    return this.registerForm.get('personalDetails').get('lastName');
  }

  get registerBirthday(){
    return this.registerForm.get('personalDetails').get('birthday');
  }

  get registerGender(){
    return this.registerForm.get('personalDetails').get('gender');
  }

  async loginSubmitHandler(){
    this.loading = true;
    try {
      const response = await this.auth.emailSignin(this.loginEmail.value, this.loginPassword.value);
      this.loading = false;
      this.success = true;
      this.router.navigate(['boardgames']);
      console.log('Login succeeded: ' + response.user.id);
    } catch (err) {
      this.loading = false;
      this.error = true;
      console.log('Login failed: ' + err);
    }
  }

  async registerSubmitHandler(){
    this.loading = true;
    let newUser: User = {
      id: '',
      email: '',
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/boardgames-bfd02.appspot.com/o/mystery_person.png?alt=media&token=68902074-9dbf-47cd-8509-2e3ff3f061e1',
      name: this.registerName.value,
      lastName: this.registerLastName.value,
      displayName: this.registerName.value + ' ' + this.registerLastName.value,
      birthday: this.registerBirthday.value,
      gender: this.registerGender.value,
      inGame: false,
      inGameLink: null,
    }

    try {
      const response = this.auth.register(this.registerEmail.value, this.registerPassword.value, newUser, this.registerPhotoToUpload)
      console.log('Registering new user succeeded: ' + response);
      this.loading = false;
      this.success = true;
      this.router.navigate(['boardgames']);
    } catch (err) {
      this.loading = false;
      this.error = true;
      console.log(err);
    }
  }

  photoToUpload(event: any) {
    this.registerPhotoToUpload = event.target.files[0];
    // Display photo in register form
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('avatar').setAttribute('src', e.target.result.toString());
    };
    reader.readAsDataURL(this.registerPhotoToUpload);
  }


  // Animation
  move(position) {
      document.getElementById('loginRegister-card-slider').style.marginLeft = position + "%";
    }

}
