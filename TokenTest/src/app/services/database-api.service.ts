import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
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
    return this.http.post(this.apiRoot + '/User/register', { id: 0, login: username, password, passwordSalt: "", personId: 0, email });
  }

  createStudent(student: Student, token: string) {
    return this.http.post(this.apiRoot + '/Student/create', student);
  }
  //TODO: Get all students based on current JWT token; return Observable<Student[]>
  getStudents(token?: string) {
    //return [new Student(1, 'John', 'Doe', 21, '2021-12-31', 'University of Washington'), new Student(2, 'Jane', 'Doe', 22, '2021-12-31', 'University of Washington'), new Student(3, 'John', 'Smith', 23, '2021-12-31', 'University of Washington'), new Student(4, 'Jane', 'Smith', 24, '2021-12-31', 'University of Washington')];

    return this.http.get(this.apiRoot + '/Student/getStudentsByTeacherId');
  }

}
