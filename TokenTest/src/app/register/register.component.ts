import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatabaseApiService } from '../services/database-api.service';

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

    constructor(private api: DatabaseApiService){}

    onSubmit(){
      this.api.register(this.registerForm.controls.username.value!, this.registerForm.controls.password.value!, this.registerForm.controls.email.value!).subscribe((data: any) => {
        console.log(data);
      });
    }

}
