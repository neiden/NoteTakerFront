import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Note } from '../models/note.model';
import { Goal } from '../models/goal.model';
import { Data } from '../models/data.model';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {

  apiRoot = "https://notetakerbackend.azurewebsites.net";
  //apiRoot = "https://localhost:7089"
  
  constructor(private http: HttpClient) { }

  login(username?: string, password?: string) {
    return this.http.post(this.apiRoot + '/User/login', {username, password});
  }
  //TODO: Add email to the register function
  register(username?: string, password?: string, email?: string) {
    return this.http.post(this.apiRoot + '/User/register', { id: 0, login: username, password, passwordSalt: "", personId: 0, email });
  }

  createStudent(student: Student) {
    return this.http.post(this.apiRoot + '/Student/create', student);
  }

  deleteStudent(studentId: number){
    return this.http.delete(this.apiRoot + '/Student/delete/' + studentId);
  }
  //TODO: Get all students based on current JWT token; return Observable<Student[]>
  getStudents(token?: string) {
    //return [new Student(1, 'John', 'Doe', 21, '2021-12-31', 'University of Washington'), new Student(2, 'Jane', 'Doe', 22, '2021-12-31', 'University of Washington'), new Student(3, 'John', 'Smith', 23, '2021-12-31', 'University of Washington'), new Student(4, 'Jane', 'Smith', 24, '2021-12-31', 'University of Washington')];

    return this.http.get(this.apiRoot + '/Student/getStudentsByTeacherId');
  }

  updateStudent(student: Student){
    return this.http.put(this.apiRoot + '/Student/update', student);
  }

  createNote(note: Note){
    return this.http.post(this.apiRoot + '/Note/create', note);
  }

  getNotes(studentId: number){
    return this.http.get(this.apiRoot + '/Note/get/student/' + studentId);
  }


  getGoals(studentId: number){
    return this.http.get(this.apiRoot + '/Goal/get/student/' + studentId);
    
    // return of([
    //   new Goal(1, 'Attendance', 1, 1), 
    //   new Goal(2, 'Homework', 2, 1), 
    //   new Goal(3, 'Participation', 3, 1), 
    //   new Goal(4, 'Test Scores', 4, 1)
    // ]);
  }

  createGoal(goal: Goal){
    return this.http.post(this.apiRoot + '/Goal/create', goal);
    //return of(goal);
  }

  deleteGoal(goalId: number){
    return this.http.delete(this.apiRoot + '/Goal/delete/' + goalId);
  }

  updateGoal(goal: Goal){
    return this.http.put(this.apiRoot + '/Goal/update', goal);
  }

  createData(data: Data){
    return this.http.post(this.apiRoot + '/Data/create', data);
    //return of(data);
  }

  deleteData(dataId: number){
    return this.http.delete(this.apiRoot + '/Data/delete/' + dataId);
  }

  updateData(data: Data){
    return this.http.put(this.apiRoot + '/Data/update', data);
  }

  getDataById(dataId: number){  
    return this.http.get(this.apiRoot + '/Data/' + dataId);
  }

  updateRecentData(goalId: number, dataId: number){
    return this.http.put(this.apiRoot + '/Goal/recentdata/' + goalId + '/' + dataId, {});
  }

  getData(studentId: number, goalId: number){
    return this.http.get(this.apiRoot + '/Data/get/student/' + studentId + '/goal/' + goalId);
  }

  authenticateAccount(token: string, email: string){ 
    return this.http.post(this.apiRoot + '/User/verify-email/'+ token + '/' + email, {});
  }

  sendResetPasswordEmail(email: string){
    return this.http.post(this.apiRoot + '/User/reset-password/' + email, {});
  }

  changePassword(userId: number, token: string, password: string){
    return this.http.post(this.apiRoot + '/User/reset-password/'+ userId + '/' + token + '/' + password, {});
  }

  uploadExcel(file: File){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.apiRoot + '/Student/upload', formData);
  }

}
