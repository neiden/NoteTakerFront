import { Component } from '@angular/core';
import { DatabaseApiService } from '../database-api.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private api: DatabaseApiService) { }


  onSubmit(){
    this.api.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!).subscribe((data: any) => {
      console.log(data);
    });
  }


}
