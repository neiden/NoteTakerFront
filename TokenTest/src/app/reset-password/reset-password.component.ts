import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatabaseApiService } from '../services/database-api.service';
import { LoadingindicatorService } from '../services/loadingindicator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  standalone: true
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    email: new FormControl(''),
  })

  errorMessage = "";
  resetFailed: boolean = false;

  constructor(private api: DatabaseApiService,  private loadingService: LoadingindicatorService, private router: Router){

  }

  onSubmit(){
    this.loadingService.loadingOn();
    let email = this.resetForm.controls.email.value;
    if (email == ''){
      this.errorMessage = "Please enter an email address.";
      this.loadingService.loadingOff();
      this.resetFailed = true;
      return;
    }
    this.api.sendResetPasswordEmail(email!).subscribe(
      {next: (d: any) => {
        this.router.navigate(['/login']);
        this.loadingService.loadingOff();
        this.resetFailed = false;
      },
        error: (e) => {
          console.log(e),
          this.resetFailed = true;
          this.loadingService.loadingOff();
          if (e.error.message){
            this.errorMessage = e.error.message;
          }
          else{
            this.errorMessage = "Password reset failed due to an unexpected error. Please try again later.";
          }
        }
      })
  }
}
