import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class SharedStudentService {
  private sharedStudent$ = new BehaviorSubject<Student>({} as Student);
  sharedStudent = this.sharedStudent$.asObservable();
  constructor() { }

  setStudent(student: Student){
    this.sharedStudent$.next(student);
  }

  
}
