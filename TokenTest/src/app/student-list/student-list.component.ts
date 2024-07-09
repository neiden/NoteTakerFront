import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseApiService } from '../services/database-api.service';
import { StudentRowComponent } from '../student-row/student-row.component';
import { Student } from '../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStudentService } from '../services/shared-student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, StudentRowComponent],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnChanges{

  @Input() filterProperty: string = '';
  @Input() searchText: string = '';
  @Input() sortProperty: string = '';
  @Input () searchBarText: string = '';

  constructor(readonly api: DatabaseApiService, readonly router: ActivatedRoute, private sharedStudentService: SharedStudentService, private route: Router){}
  students: Student[] = [];
  filteredStudents: Student[] = [];
  loading = true;

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("Student list receiving changed filter: " + changes['filterProperty'].currentValue);
    if (changes['filterProperty'] || changes['searchText']){
      this.applyFilter('filter');
    }
    if (changes['searchBarText']){
      this.applyFilter('searchBar');
    }
    if (changes['sortProperty']){
      this.changeSort(changes['sortProperty'].currentValue);
    }
  }

  changeSort(newSort: string){
    console.log("Calling changeSort with: " + newSort);
    switch(newSort){
      case 'age':
        this.students.sort((a,b) =>  a.age - b.age);
        break;
      case 'school':
        this.students.sort((a,b) => a.school.localeCompare(b.school));
        break;
      case 'dueDate':
        this.students.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      default:
        break;
    }
  }

  applyFilter(filterType: string){
    let tempStudents = this.students;
    console.log("Calling applyFilter with: " + this.filterProperty + " and "+ this.searchText);

    if (filterType === 'filter'){
      if (this.filterProperty) {
        tempStudents = tempStudents.filter(student => (student as any)[this.filterProperty].toString().toLowerCase().includes(this.searchText.toLowerCase()));
      }
    }

    if (filterType === 'searchBar'){
      tempStudents = tempStudents.filter(student => student.fName.toLowerCase().includes(this.searchBarText.toLowerCase()) || student.lName.toLowerCase().includes(this.searchBarText.toLowerCase()));
    }
    console.log("Filtered students: " + tempStudents.length);

    this.filteredStudents = tempStudents;
  }

  changeFilter(filter: string){
    console.log("Calling changeFilter with: " + filter + " and "+ this.searchText);
    let tempStudents = this.students;

    // Filter based on the filterProperty if it's not empty
    if (this.filterProperty) {
      tempStudents = tempStudents.filter(student => (student as any)[this.filterProperty].toString().toLowerCase().includes(this.searchText.toLowerCase()));
    }

    // Add sorting logic here if needed

    this.filteredStudents = tempStudents;
  }

  ngOnInit(){
    const token = localStorage.getItem('token')
    this.api.getStudents(token!).subscribe((students) => {
      this.students = students as Student[];
      this.loading = false;
    });

    this.sharedStudentService.getRefreshStudentList().subscribe(() => {
      this.loading = true;
      this.api.getStudents(token!).subscribe((students) => {
        this.students = students as Student[];
        this.loading = false;
      });
    });
  }

  getDueDateColor(dueDate: Date){
    var dueDate = new Date(dueDate);
    const now = new Date();
    const difference = (dueDate.getTime() - now.getTime()) / 86400000; // Get the difference in days
    if(difference < 14){
      return 'red';
    }
    else if(difference >= 14 && difference < 30){
      return 'yellow';
    }
    else {
      return 'green';
    }
  }

  showStudent(student: Student){
    this.sharedStudentService.setStudent(student);
    this.route.navigate(['student-view']);
  }


}
