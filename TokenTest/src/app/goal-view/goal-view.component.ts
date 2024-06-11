import { Component } from '@angular/core';
import { SharedStudentService } from '../services/shared-student.service';
import { Student } from '../models/student.model';
import { Data } from '../models/data.model';
import { DatabaseApiService } from '../services/database-api.service';
import { SharedGoalService } from '../services/shared-goal.service';
import { Goal } from '../models/goal.model';
import { CreateDataDialogComponent } from '../create-data-dialog/create-data-dialog.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-view',
  templateUrl: './goal-view.component.html',
  styleUrls: ['./goal-view.component.css'],
  imports: [MatDialogModule, CommonModule ],
  standalone: true
})
export class GoalViewComponent {

  student: Student = {} as Student;
  data: Data[] = [];
  goal = {} as Goal;
  loadingData = true; 
  constructor(private dialogRef: MatDialog,private sharedGoalService: SharedGoalService,private api: DatabaseApiService,private sharedStudentService: SharedStudentService) {}

  ngOnInit() {
    this.sharedStudentService.sharedStudent.subscribe((student) => {
      this.student = student;
      this.sharedGoalService.sharedGoal.subscribe((goal) => {
        this.goal = goal;
        this.api.getData(this.student.id, this.goal.id).subscribe((data) => {
          this.data = data as Data[];
          this.loadingData = false;
        });
      });
  });
  }

  openCreateDataDialog(){
    this.dialogRef.open(CreateDataDialogComponent);
  }
}
