import { Component } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import {FormGroup, FormControl} from '@angular/forms';
import { LoadingindicatorComponent } from '../loadingindicator/loadingindicator.component';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { Router } from '@angular/router';

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



  constructor(private api: DatabaseApiService, private loadingService: LoadingindicatorService, private router: Router) { }


  onSubmit(){
      this.loadingService.loadingOn();
      this.api.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!).subscribe(
        {next: (d) => {
          this.router.navigate(['/home']);
          this.loadingService.loadingOff();
        },
          error: (e) => {
            console.log(e),
            this.loadingService.loadingOff();
          }
        })
      // this.api.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!).subscribe((data: any) => {
      //   if(data.token){
      //     this.router.navigate(['/home']);  
      //   }
      //   this.loadingService.loadingOff(); 
      // },
      // (error: any) => {
      //   console.log(error);
      //   this.loadingService.loadingOff();
      // });
    }


}
