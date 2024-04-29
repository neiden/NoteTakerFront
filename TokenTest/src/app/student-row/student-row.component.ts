import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.css']
})
export class StudentRowComponent {
  @Input() student: any;

}
