import { Component, NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentListComponent } from '../student-list/student-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule, NavbarComponent, StudentListComponent, MatDatepickerModule, MatNativeDateModule, RouterLink],
  standalone: true
})
export class HomeComponent {
  filterProperty: string = '';
  hideRequiredControl = new FormControl(false);
  selectedDate: Date = new Date();
}
