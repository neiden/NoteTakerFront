import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {

  apiRoot = "https://localhost:7089";

  constructor(private http: HttpClient) { }

  login(username?: string, password?: string) {
    return this.http.post(this.apiRoot + '/User/login', {username, password});
  }

}
