import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-goal-dialog',
  templateUrl: './create-goal-dialog.component.html',
  styleUrls: ['./create-goal-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  standalone: true
})
export class CreateGoalDialogComponent {
  goalCategory = '';
  createFailed: boolean = false;
  constructor(private api: DatabaseApiService, private dialogRef: MatDialogRef<CreateGoalDialogComponent>, private loadingService: LoadingindicatorService, private studentService: SharedStudentService) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    var token = localStorage.getItem('token')!;
    this.loadingService.loadingOn();
    var goal = {} as Goal;
    goal.category = this.goalCategory;

    this.api.createGoal(goal).subscribe(
      {next: (data:any) => {
        this.loadingService.loadingOff();
        this.dialogRef.close();
        console.log("Goal created successfully: " + data.category);
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
