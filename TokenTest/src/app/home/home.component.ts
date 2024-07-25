import { Component, NgModule, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentListComponent } from '../student-list/student-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { NewStudentDialogComponent } from '../new-student-dialog/new-student-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule, MatMenuModule, MatSelectModule, MatFormFieldModule, MatIconModule, NavbarComponent, StudentListComponent, MatDatepickerModule, MatNativeDateModule, RouterLink, MatDialogModule],
  standalone: true
})  
export class HomeComponent implements OnInit {
  filterProperty: string = '';
  searchText: string = '';
  searchBarText: string= '';
  sortProperty: string = '';
  hideRequiredControl = new FormControl(false);
  selectedDate: Date = new Date();
  username: string = 'User';
  constructor(private dialogRef: MatDialog, private router: Router){}

  ngOnInit(){
    this.username = localStorage.getItem('username')!;
  }

  openDialog(){
    this.dialogRef.open(NewStudentDialogComponent);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  openProfile(){
    this.router.navigate(['/profile']);
  }

  openSettings(){
    this.router.navigate(['/settings']);
  }

  filterChanged(){
    //console.log("changing filter: " + this.filterProperty);
  }

}
