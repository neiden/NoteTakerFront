import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatabaseApiService } from '../services/database-api.service';
import { Student } from '../models/student.model';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingindicatorService } from '../services/loadingindicator.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
  imports: [MatNativeDateModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatDatepickerModule, MatSelectModule],
  standalone: true
})
export class UpdateDialogComponent implements OnInit{
  updateForm: FormGroup;
  entityType: string;
  date: Date = new Date();
  entity: any;
  formControls: {}

  constructor(
    private loadingService: LoadingindicatorService,
    private fb: FormBuilder,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private api: DatabaseApiService,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.entity = data.entityData;
      this.entityType = data.entityType;
      this.updateForm = this.fb.group({});
      switch (this.entityType) {
        case 'student':
          this.formControls = {
            fName : ['', [Validators.required]],
            lName: ['', [Validators.required]],
            age: ['', [Validators.required]],
            dueDate: [''],
            school: ['', [Validators.required]],
          };
          break;
       case 'goal':
          this.formControls = {
            category : ['', [Validators.required]],
          };
          break;
       case 'data':
          this.formControls = {
            independent : ['', [Validators.required]],
            prompted: ['', [Validators.required]],
            selfCorrected: ['', [Validators.required]],
            teaching: ['', [Validators.required]],
            note: ['',],
            date: ['', [Validators.required]],
          };
          break;
      default:
        this.formControls = {};
        break;
      }

      
    }
  

  ngOnInit(): void {
    this.updateForm = this.fb.group(this.formControls);
    this.updateForm.patchValue(this.entity);
    if (this.entityType === 'student'){
      this.date = this.entity.dueDate;
      console.log("Patched the form with this entity: " + JSON.stringify(this.entity));
      const dateValue = this.entity.dueDate;
      console.log("Found this date value: " + dateValue);
      if (dateValue) {
        this.updateForm.get('dueDate')!.setValue( new Date(dateValue).toISOString().split('T')[0]);
        console.log("Set the date value to: " + this.updateForm.get('dueDate')?.value);
      }
    }
    this.date = this.entity.date;
    this.updateForm.get('date')!.setValue(new Date(this.date).toISOString().split('T')[0]);
  }

  updateEntity(): void {
    this.loadingService.loadingOn();
    if (this.entityType === 'student') {
      let student = this.updateForm.value;
      student.id = this.entity.id;
      student.teacherId = this.entity.teacherId;

      console.log("Student object being sent to update: " + JSON.stringify(student));
      this.api.updateStudent(student as Student).subscribe({
        next: (response) => {
          console.log("Student updated: " + JSON.stringify(response));
          this.loadingService.loadingOff();
        },
        error: (error) => {
          // Handle error
          console.log("Error updating student: " + error);
          this.loadingService.loadingOff();
        }
      });
    }
    else if (this.entityType === 'goal') {
      let goal = this.updateForm.value;
      goal.id = this.entity.id;
      goal.studentId = this.entity.studentId;
      goal.recentData = this.entity.recentData;
      this.api.updateGoal(goal).subscribe({
        next: (response) => {
          console.log("Goal updated: " + JSON.stringify(response));
          this.loadingService.loadingOff();
        },
        error: (error) => {
          // Handle error
          console.log("Error updating goal: " + error);
          this.loadingService.loadingOff();
        }
      });
    }
    else if (this.entityType === 'data') {
      let data = this.updateForm.value;
      data.id = this.entity.id;
      data.goalId = this.entity.goalId;
      data.studentId = this.entity.studentId;
      this.api.updateData(data).subscribe({
        next: (response) => {
          console.log("Data updated: " + JSON.stringify(response));
          this.loadingService.loadingOff();
        },
        error: (error) => {
          console.log("Error updating data: " + error);
          this.loadingService.loadingOff();
        }
      });
    }

    this.dialogRef.close();
  }
}
