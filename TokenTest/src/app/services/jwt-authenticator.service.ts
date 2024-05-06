import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticatorService {

  constructor() { }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public checkExpiration(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public setToken(token: string): void {
    localStorage.setItem
  }

}
