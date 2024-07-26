import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatabaseApiService } from '../services/database-api.service';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { JwtAuthenticatorService } from '../services/jwt-authenticator.service';

@Component({
  selector: 'app-verified-reset-password',
  templateUrl: './verified-reset-password.component.html',
  styleUrls: ['./verified-reset-password.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  standalone: true
})
export class VerifiedResetPasswordComponent {
  passwordForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  errorMessage = "";
  passwordFailed: boolean = false;  
  loading = true;
  success = false;
  token = "";
  userId = 0;

  constructor(private jwtAuth: JwtAuthenticatorService,private activeRoute: ActivatedRoute,private api: DatabaseApiService,  private loadingService: LoadingindicatorService, private router: Router){
  }


  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.token = params['token']
      this.userId = params['id']
      if (this.jwtAuth.checkExpiration(this.token)) {
        console.log("Token expired")
        this.errorMessage = "Token expired";
        this.loading = false;
        return;  
      }
    });
  }

  onSubmit(){
    var password = this.passwordForm.controls.password.value;

    this.api.changePassword(this.userId, this.token, password!).subscribe({
      next: (response) => { 
        console.log("Account verified!")
        this.success = true;
        this.loading = false; 
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("Error verifying account")
        this.errorMessage = "Error verifying account";
        this.loading = false
      }
    });
  }


}
