import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseApiService } from '../services/database-api.service';
import { StudentRowComponent } from '../student-row/student-row.component';
import { Student } from '../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStudentService } from '../services/shared-student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, StudentRowComponent],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  constructor(readonly api: DatabaseApiService, readonly router: ActivatedRoute, private sharedStudentService: SharedStudentService, private route: Router){}
  students: any;
  loading = true;

  ngOnInit(){
    const token = localStorage.getItem('token')
    this.api.getStudents(token!).subscribe((students) => {
      this.students = students;
      this.loading = false;
    });

    this.sharedStudentService.getRefreshStudentList().subscribe(() => {
      this.loading = true;
      this.api.getStudents(token!).subscribe((students) => {
        this.students = students;
        this.loading = false;
      });
    });
  }

  showStudent(student: Student){
    this.sharedStudentService.setStudent(student);
    this.route.navigate(['student-view']);
  }


}
