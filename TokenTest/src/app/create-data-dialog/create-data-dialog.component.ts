import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-data-dialog',
  templateUrl: './create-data-dialog.component.html',
  styleUrls: ['./create-data-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatDatepickerModule, CommonModule, MatInputModule],
  standalone: true
})
export class CreateDataDialogComponent {
  createFailed: boolean = false;
  goal = {} as Goal;
  independent: number = 0;
  prompted: number = 0;
  selfCorrect: number = 0;
  teaching: number = 0;
  date: Date = new Date();
  notes: string = "";
  constructor(private api: DatabaseApiService, private dialogRef: MatDialogRef<CreateDataDialogComponent>, private loadingService: LoadingindicatorService){}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    var token = localStorage.getItem('token')!;
    this.loadingService.loadingOn();
    var data = {} as Data;
    //Set all of data fields based on what the user inputted

    this.api.createData(data).subscribe(
      {next: (data:any) => {
        this.loadingService.loadingOff();
        this.dialogRef.close();
        console.log("Data created successfully: " + data);
        //this.studentService.refreshGoalList();
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
