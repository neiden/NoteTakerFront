import { Component } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import {FormGroup, FormControl} from '@angular/forms';
import { LoadingindicatorComponent } from '../loadingindicator/loadingindicator.component';
import { LoadingindicatorService } from '../services/loadingindicator.service';

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

  constructor(private api: DatabaseApiService, private loadingService: LoadingindicatorService) { }


  onSubmit(){
    try{
      this.loadingService.loadingOn();

      this.api.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!).subscribe((data: any) => {
        console.log(data);
      });
    }
    catch(error){
      console.log(error);
    }
    finally{
      this.loadingService.loadingOff();
    }
  }


}
