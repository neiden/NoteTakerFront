import { Component, Input } from '@angular/core';
import { Student } from '../models/student.model';
import { SharedStudentService } from '../services/shared-student.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  imports: [MatIconModule],
  standalone: true

})
export class StudentViewComponent {

  student: Student = {} as Student;

  ngOnInit() {
    this.sharedStudentService.sharedStudent.subscribe(student => this.student = student);
  }



  constructor(private sharedStudentService: SharedStudentService) { }


}
