import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {

  apiRoot = "https://notetakerbackend.azurewebsites.net";

  constructor(private http: HttpClient) { }

  login(username?: string, password?: string) {
    return this.http.post(this.apiRoot + '/User/login', {username, password});
  }
  //TODO: Add email to the register function
  register(username?: string, password?: string, email?: string) {
    return this.http.post(this.apiRoot + '/User/register', { id: 0, login: username, password, passwordSalt: "", personId: 0 });
  }

}
