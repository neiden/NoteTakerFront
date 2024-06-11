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

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  imports: [MatIconModule, NavbarComponent, CommonModule, MatDialogModule],
  standalone: true

})
export class StudentViewComponent {

  student: Student = {} as Student;
  notes: Note[] = [];
  goals: Goal[] = [];
  invalidNote = false;
  loadingNotes = true;
  loadingGoals = true;
  
  
  constructor(private router: Router,private dialogRef: MatDialog, private sharedStudentService: SharedStudentService, private api: DatabaseApiService, private loadingService: LoadingindicatorService) { }

  ngOnInit() {
    this.sharedStudentService.sharedStudent.subscribe((student) => {
      this.student = student;
      this.api.getNotes(this.student.id).subscribe((notes) => {
        this.notes = notes as Note[];
        this.loadingNotes = false;
      });

      this.api.getGoals(this.student.id).subscribe((goals) => {
        this.goals = goals as Goal[];
        this.loadingGoals = false;
      });
  });
  }

  openDialog(){
    this.dialogRef.open(CreateGoalDialogComponent);
  }

  openGoalView(){
    this.router.navigate(['/goal-view']);
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
