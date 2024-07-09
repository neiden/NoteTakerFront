import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  imports: [MatMenuModule, MatSelectModule, MatFormFieldModule, MatIconModule, NavbarComponent, StudentListComponent, MatDatepickerModule, MatNativeDateModule, RouterLink, MatDialogModule],
  standalone: true

})
export class RightSidebarComponent implements OnInit{
  hideRequiredControl = new FormControl(false);
  selectedDate: Date = new Date();
  username: string = 'User';

  constructor(private router: Router){}



  ngOnInit(){
    this.username = localStorage.getItem('username')!;
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

}
