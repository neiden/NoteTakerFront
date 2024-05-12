import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatabaseApiService } from '../services/database-api.service';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
    })

    registrationFailed: boolean = false;

    constructor(private api: DatabaseApiService,  private loadingService: LoadingindicatorService, private router: Router){}

    onSubmit(){

      // this.api.register(this.registerForm.controls.username.value!, this.registerForm.controls.password.value!, this.registerForm.controls.email.value!).subscribe((data: any) => {
      //   console.log(data);
      // });
      this.loadingService.loadingOn();
      this.api.register(this.registerForm.controls.username.value!, this.registerForm.controls.password.value!, this.registerForm.controls.email.value!).subscribe(
        {next: (d: any) => {
          localStorage.setItem('token', d.token);
          
          this.router.navigate(['/login']);
          this.loadingService.loadingOff();
          this.registrationFailed = false;
        },
          error: (e) => {
            console.log(e),
            this.registrationFailed = true;
            this.loadingService.loadingOff();
          }
        })
    }

}
