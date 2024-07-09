import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { SharedStudentService } from '../services/shared-student.service';
import { DatabaseApiService } from '../services/database-api.service';
import { Goal } from '../models/goal.model';
import { Data } from '../models/data.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedGoalService } from '../services/shared-goal.service';
import { Student } from '../models/student.model';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-create-data-dialog',
  templateUrl: './create-data-dialog.component.html',
  styleUrls: ['./create-data-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatDatepickerModule, CommonModule, MatInputModule],
  standalone: true
})
export class CreateDataDialogComponent implements OnInit{
  createFailed: boolean = false;
  goal = {} as Goal;
  student = {} as Student;
  independent: number = 0;
  prompted: number = 0;
  selfCorrected: number = 0;
  teaching: number = 0;
  date: Date = new Date();
  note: string = "";
  constructor(private dataService: SharedDataService,private studentService: SharedStudentService, private goalService: SharedGoalService, private api: DatabaseApiService, private dialogRef: MatDialogRef<CreateDataDialogComponent>, private loadingService: LoadingindicatorService){}

  ngOnInit(){
    this.goalService.sharedGoal.subscribe((goal) => {
      this.goal = goal;
    });

    this.studentService.sharedStudent.subscribe((student) => {
      this.student = student;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    var token = localStorage.getItem('token')!;
    this.loadingService.loadingOn();
    var data = {} as Data;
   
    data.independent = this.independent;
    data.prompted = this.prompted;
    data.selfCorrected = this.selfCorrected;
    data.teaching = this.teaching;
    data.date = this.date;
    data.note = this.note;
    data.goalId = this.goal.id;
    data.studentId = this.student.id;
    console.log("Data to be created: " + JSON.stringify(data));

    this.api.createData(data).subscribe(
      {next: (data:any) => {
  
        console.log("Data created successfully: " + data);
        this.api.updateRecentData(this.goal.id, data.id).subscribe({
          next: (data: any) => {
            console.log("Recent data updated successfully: " + data);
            this.loadingService.loadingOff();
            this.dialogRef.close();
            this.dataService.refreshDataList();
          },
          error: (e) => {
            this.loadingService.loadingOff();
            console.log("Error updating recent data: " + e);
          }
        });
      },   
      error: (e) => {
        console.log("Error creating goal: " + e);
        this.createFailed = true;
        this.loadingService.loadingOff();
      }
    }
    );
  }
}
