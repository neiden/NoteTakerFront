import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatabaseApiService } from '../services/database-api.service';
import { CreateDataDialogComponent } from '../create-data-dialog/create-data-dialog.component';
import { LoadingindicatorComponent } from '../loadingindicator/loadingindicator.component';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { SharedStudentService } from '../services/shared-student.service';
import { Goal } from '../models/goal.model';
import { CommonModule } from '@angular/common';
import { SharedGoalService } from '../services/shared-goal.service';

@Component({
  selector: 'app-create-goal-dialog',
  templateUrl: './create-goal-dialog.component.html',
  styleUrls: ['./create-goal-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  standalone: true
})
export class CreateGoalDialogComponent implements OnInit{
  goalCategory = '';
  createFailed: boolean = false;
  studentId = 0;
  constructor(private sharedGoalService: SharedGoalService,private api: DatabaseApiService, private dialogRef: MatDialogRef<CreateGoalDialogComponent>, private loadingService: LoadingindicatorService, private studentService: SharedStudentService) { }

  ngOnInit(): void {
      this.studentService.sharedStudent.subscribe((student) => {
        this.studentId = student.id;
      });
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    var token = localStorage.getItem('token')!;
    this.loadingService.loadingOn();
    var goal = {} as Goal;
    goal.category = this.goalCategory;
    goal.recentData = -1;
    goal.studentId = this.studentId;

    this.api.createGoal(goal).subscribe(
      {next: (data: any) => {
        this.loadingService.loadingOff();
        this.dialogRef.close();
        this.sharedGoalService.refreshGoalList();
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
