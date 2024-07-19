import { Component, Input } from '@angular/core';
import { Student } from '../models/student.model';
import { SharedStudentService } from '../services/shared-student.service';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { DatabaseApiService } from '../services/database-api.service';
import {Note} from '../models/note.model';
import {Goal} from '../models/goal.model';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateGoalDialogComponent } from '../create-goal-dialog/create-goal-dialog.component';
import { Router } from '@angular/router';
import { SharedGoalService } from '../services/shared-goal.service';
import { Data } from '../models/data.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  imports: [MatIconModule, NavbarComponent, CommonModule, MatDialogModule,MatDatepickerModule, RightSidebarComponent, MatSelectModule],
  standalone: true

})
export class StudentViewComponent {

  student: Student = {} as Student;
  notes: Note[] = [];
  goals: Goal[] = [];

  recentData: {goalId: number, data: Data}[] = [];
  invalidNote = false;
  loadingNotes = true;
  loadingGoals = true;
  loadingRecentData = true;
  
  filterProperty: string = '';
  sortProperty: string = '';
  
  constructor(private sharedGoalService: SharedGoalService, private router: Router,private dialogRef: MatDialog, private sharedStudentService: SharedStudentService, private api: DatabaseApiService, private loadingService: LoadingindicatorService) { }

  ngOnInit() {
    this.sharedStudentService.sharedStudent.subscribe((student) => {
      this.student = student;

      this.api.getGoals(this.student.id).subscribe((goals) => {
        this.loadData(goals as Goal[]);
        
      });
    this.sharedGoalService.getRefreshGoalList().subscribe((data) => {
      this.loadingGoals = true;
      this.api.getGoals(this.student.id).subscribe((goals) => {
        this.loadData(goals as Goal[]);
      });
  });
    });
  }

  loadData(goals: Goal[]){
    this.goals = goals;
    this.loadingGoals = false;
    for(let goal of this.goals){
      if (goal.recentData > 0){
        console.log("Goal currently searching for related data: " + goal.recentData);
        this.api.getDataById(goal.recentData).subscribe((data) => {
          this.recentData.push({goalId: goal.id, data: data as Data});
          this.loadingGoals = false;
        });
      }
      else{
        this.loadingGoals = false;
      }
    }

  }

  openDialog(){
    this.dialogRef.open(CreateGoalDialogComponent);
    }

  getRecentDataForGoal(goalId: number) {
    const matchingData = this.recentData.find(data => data.goalId === goalId);
    return matchingData ? matchingData.data.date : null;
  }
    
  openGoalView(goal: Goal){
    this.sharedGoalService.setGoal(goal);
    this.router.navigate(['/goal-view']);
  }

  filterChanged(){
    console.log("changing filter: " + this.filterProperty);
  }

  updateStudent(){
    console.log("updating student: " + this.student.id);
    const dialogRef = this.dialogRef.open(UpdateDialogComponent, {
      data: {entityType: 'student',
             entityData: this.student
      }
    });
  }

  deleteStudent(){
    console.log("Deleting student: " + this.student.id);
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: {entity: 'student'}
    
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadingService.loadingOn();
        this.api.deleteStudent(this.student.id).subscribe({
          next: (data: any) => {
            console.log("Student deleted: " + data);
            this.loadingService.loadingOff();
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.log("Error deleting student: " + e);
            this.loadingService.loadingOff();
          }
        });
      }
    });
  }

  submitNote(noteContent: HTMLTextAreaElement){
    this.loadingService.loadingOn();
    if(noteContent.value == ""){
      this.loadingService.loadingOff();
      this.invalidNote = true;
    }
    else{
      let note = {} as Note;
      note.content = noteContent.value;
      note.studentId = this.student.id;
      note.date = new Date();
      note.id = 0;
      console.log("creating this note: " + note.date);
      noteContent.value = "";
      this.api.createNote(note).subscribe(
        {next: (data: any) =>{
          console.log("Note created: " + data);
          this.loadingService.loadingOff();
          this.notes.push(note);
        },
        error: (e) => {
          console.log("Error creating note: " + e);
          this.loadingService.loadingOff();
        }
      });
    }
  }



}
