import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DatabaseApiService } from '../services/database-api.service';
import { Student } from '../models/student.model';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { EventEmitter } from '@angular/core';
import { SharedStudentService } from '../services/shared-student.service';
@Component({
  selector: 'app-new-student-dialog',
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, CommonModule, MatInputModule],
  standalone: true
})
export class NewStudentDialogComponent {

  lname = '';
  fname = '';
  school = '';
  age: any;
  dueDate = new Date();
  createFailed: boolean = false;
  constructor(private api: DatabaseApiService,private dialogRef: MatDialogRef<NewStudentDialogComponent>, private loadingService: LoadingindicatorService, private studentService: SharedStudentService){

  }

  onCancel(): void {
    this.dialogRef.close();
  }


  onCreate(): void {
    var token = localStorage.getItem('token')!;
    this.loadingService.loadingOn();
    var student = {} as Student;
    student.fName = this.fname;
    student.lName = this.lname;
    student.age = this.age;
    student.dueDate = this.dueDate.toISOString();
    student.school = this.school;

    this.api.createStudent(student, token).subscribe(
      {next: (data:any) => {
        this.loadingService.loadingOff();
        this.dialogRef.close();

        this.studentService.refreshStudentList();
      },
      error: (e) => {
        console.log("Error creating student: " + e);
        this.createFailed = true;
        this.loadingService.loadingOff();
      }
    }
    );
  }

}
