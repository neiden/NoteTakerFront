import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class StudentListComponent implements OnChanges{

  @Input() filterProperty: string = '';

  constructor(readonly api: DatabaseApiService, readonly router: ActivatedRoute, private sharedStudentService: SharedStudentService, private route: Router){}
  students: Student[] = [];
  loading = true;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Student list receiving changed filter: " + changes['filterProperty'].currentValue);
    this.changeFilter(changes['filterProperty'].currentValue);
  }

  changeFilter(newFilter: string){
      switch(newFilter){
        case 'age':
          this.students.sort((a,b) =>  a.age - b.age);
          break;
        case 'school':
          this.students.sort((a,b) => a.school.localeCompare(b.school));
          break;
        case 'dueDate':
          this.students.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
          break;
        default:
          break;
      }
    }

  ngOnInit(){
    const token = localStorage.getItem('token')
    this.api.getStudents(token!).subscribe((students) => {
      this.students = students as Student[];
      this.loading = false;
    });

    this.sharedStudentService.getRefreshStudentList().subscribe(() => {
      this.loading = true;
      this.api.getStudents(token!).subscribe((students) => {
        this.students = students as Student[];
        this.loading = false;
      });
    });
  }

  getDueDateColor(dueDate: Date){
    var dueDate = new Date(dueDate);
    const now = new Date();
    const difference = (dueDate.getTime() - now.getTime()) / 86400000; // Get the difference in days
    console.log("Due date: " + dueDate +" now: " + now + " difference: " + difference);
    if(difference < 14){
      return 'red';
    }
    else if(difference >= 14 && difference < 30){
      return 'yellow';
    }
    else {
      return 'green';
    }
  }

  showStudent(student: Student){
    this.sharedStudentService.setStudent(student);
    this.route.navigate(['student-view']);
  }


}
