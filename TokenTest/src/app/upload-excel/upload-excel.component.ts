import { Component, Input } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { SharedStudentService } from '../services/shared-student.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class UploadExcelComponent {
  requiredFileType = '';
  fileName = "";
  selectedFile: File | null = null;

  constructor(private loadingService: LoadingindicatorService, private api: DatabaseApiService, private studentService: SharedStudentService ){}

  onFileSelected(event: Event)
   {
    const element = event.target as HTMLInputElement;
    const file: File | null = element.files![0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.fileName = file.name;
      this.requiredFileType = file.type;
      console.log(file);
      this.selectedFile = file;
    }
  }

  uploadFile(){
    console.log("File uploaded");
    if (this.selectedFile) {
      this.loadingService.loadingOn();
      this.api.uploadExcel(this.selectedFile).subscribe({
        next: (data) => {
          this.loadingService.loadingOff();
          this.studentService.refreshStudentList();
          console.log(data);
        },
        error: (error) => {
          this.loadingService.loadingOff();
          console.error(error);
        }
    });
    }
  }
}
