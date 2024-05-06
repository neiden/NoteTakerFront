import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtAuthenticatorService } from './jwt-authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private router: Router, private jwtAuth: JwtAuthenticatorService) { }

  canActivate(next: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
    console.log("Checking permissions to access route");
    const token = this.jwtAuth.getToken();
    if (!token){
      this.router.navigate(['login']);
      console.log("No Token found; Access Denied")
      return false;
    }
    if (this.jwtAuth.checkExpiration(token)){
      this.router.navigate(['login']);
      console.log("Token expired; Access Denied");
      return false;
    }
    console.log("Access granted");
    return true;
  }
}

// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     return inject(PermissionService).canActivate(next, state);
//   }
