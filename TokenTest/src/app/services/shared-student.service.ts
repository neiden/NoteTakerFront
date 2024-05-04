import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class SharedStudentService {
  //Handles sharing the currently selected student from student list
  private sharedStudent$ = new BehaviorSubject<Student>({} as Student);
  sharedStudent = this.sharedStudent$.asObservable();

  //Tells any component that uses the list of student to refresh the list i.e. call api.getStudents again
  private refreshStudentList$ = new Subject<void>();
  
  constructor() { }

  setStudent(student: Student){
    this.sharedStudent$.next(student);
  }

  getRefreshStudentList(){ 
     return this.refreshStudentList$;
    }
  
    refreshStudentList(){
      this.refreshStudentList$.next();
    }
}
