import { Component } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtAuthenticatorService } from '../services/jwt-authenticator.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css'],
  imports: [CommonModule, RouterLink, RouterModule],
  standalone: true
})
export class VerifyAccountComponent {
  loading: boolean = true;
  success: boolean = false;
  constructor(private api: DatabaseApiService, private activeRoute: ActivatedRoute, private jwtAuth: JwtAuthenticatorService) { }


  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      var token = params['token']
      var email = params['id']
      if (this.jwtAuth.checkExpiration(token)) {
        console.log("Token expired")
        this.loading = false;
        return;  
      }
      if (token && email) {
        this.api.authenticateAccount(token, email).subscribe({
          next: (response) => {
            console.log("Account verified!")
            this.success = true;
            this.loading = false;
          },
          error: (error) => {
            console.log("Error verifying account")
            this.loading = false
          }
        });
      }
    });
  }
}
