import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedStudentService } from '../services/shared-student.service';
import { Student } from '../models/student.model';
import { Data } from '../models/data.model';
import { DatabaseApiService } from '../services/database-api.service';
import { SharedGoalService } from '../services/shared-goal.service';
import { Goal } from '../models/goal.model';
import { CreateDataDialogComponent } from '../create-data-dialog/create-data-dialog.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule, JsonPipe } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CartesianScaleOptions, Chart, ChartConfiguration, ChartDataset, ChartOptions, ChartType, ScatterDataPoint } from "chart.js";
import 'chartjs-adapter-moment';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedDataService } from '../services/shared-data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LoadingindicatorService } from '../services/loadingindicator.service';
import { Router } from '@angular/router';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


@Component({
  selector: 'app-goal-view',
  templateUrl: './goal-view.component.html',
  styleUrls: ['./goal-view.component.css'],
  imports: [NavbarComponent, MatDialogModule, CommonModule, NgChartsModule, MatFormFieldModule, MatDatepickerModule,FormsModule, ReactiveFormsModule, JsonPipe],
  standalone: true
})
export class GoalViewComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;
  
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  student: Student = {} as Student;
  data: Data[] = [];
  goal = {} as Goal;
  loadingData = true; 
  currDate = new Date();
  previousDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  title = 'Student Info';

  constructor(private router: Router,private loadingService: LoadingindicatorService, private sharedGoalService: SharedGoalService, private dialogRef: MatDialog,private sharedDataService: SharedDataService,private api: DatabaseApiService,private sharedStudentService: SharedStudentService) {}



  public lineChartOptions: ChartOptions = {
    hover: {
      intersect: false,
      mode: 'nearest',
    },
    responsive: true,
    scales: {
      x: 
        {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM D'
            }
          },
          min: this.previousDate.toISOString().split('T')[0],
          max: new Date().toISOString().split('T')[0],
          // min:  `${this.currDate.getFullYear()}-${this.currDate.getMonth() + 1}-${this.currDate.getDate()}`,
          // max: `${this.previousDate.getFullYear()}-${this.previousDate.getMonth() + 1}-${this.previousDate.getDate()}`
        },
      y:
        {
          beginAtZero: true,
          min: 0,
          max: 100
        }
    }
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets : [{
      data: [],
      label: 'Indepedent',
      fill: true,
      tension: 0.2,
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    },
    {
      data: [],
        label: 'Prompted',
        fill: true,
        tension: 0.2,
        borderColor: 'black',
        backgroundColor: 'rgba(0,255,0,0.3)'
    },
    {
      data: [],
        label: 'Self Corrected',
        fill: true,
        tension: 0.2,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,255,0.3)'
    },
    {
        data: [],
        label: 'Teaching',
        fill: true,
        tension: 0.2,
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.3)'
    },
  ]
    
  };


  public parseData(data: Data[]){ 
    let independentData = [] as ScatterDataPoint[];
    let promptedData = [] as ScatterDataPoint[];
    let selfCorrectedData = [] as ScatterDataPoint[];
    let teachingData = [] as ScatterDataPoint[];

    data.forEach((d) => {
      independentData.push({ x: new Date(d.date).getTime(), y: d.independent });
      promptedData.push({ x: new Date(d.date).getTime(), y: d.prompted });
      selfCorrectedData.push({ x: new Date(d.date).getTime(), y: d.selfCorrected });
      teachingData.push({ x: new Date(d.date).getTime(), y: d.teaching });
    });

    independentData.sort((a, b) => a.x - b.x);
    promptedData.sort((a, b) => a.x - b.x);
    selfCorrectedData.sort((a, b) => a.x - b.x);
    teachingData.sort((a, b) => a.x - b.x);

    return [independentData, promptedData, selfCorrectedData, teachingData];
  }

  public lineChartLegend = true;

  ngOnInit() {
    this.range.valueChanges.subscribe(() => {
      if (this.range.value.start && this.range.value.end) {
        this.updateChart();
      }
    });
    this.sharedStudentService.sharedStudent.subscribe((student) => {
      this.student = student;
      this.sharedGoalService.sharedGoal.subscribe((goal) => {
        this.goal = goal;
        this.api.getData(this.student.id, this.goal.id).subscribe((data) => {
          this.data = data as Data[];
          console.log(this.data)
          this.loadingData = false;

          const parsedData = this.parseData(this.data);
            
          for(let i = 0; i < parsedData.length; i++){
            this.lineChartData.datasets[i].data = parsedData[i];
          }

          this.chart?.update();
        });
      });
  });

  this.sharedDataService.getRefreshDataList().subscribe(() => {
    this.loadingData = true;
    this.api.getData(this.student.id, this.goal.id).subscribe((data) => {
      this.data = data as Data[];
      console.log(this.data)
      this.loadingData = false;

      const parsedData = this.parseData(this.data);
      
      for(let i = 0; i < parsedData.length; i++){
        this.lineChartData.datasets[i].data = parsedData[i];
      }
      
      this.chart?.update();
    });
  });
  }


  updateChart() {
    if (this.chart) {
      const startDate = this.range.get('start')?.value;
      const endDate = this.range.get('end')?.value;
  
      if (startDate && endDate) {
        if (this.chart.options && this.chart.options.scales && this.chart.options.scales['x'] && this.chart.chart) {
          const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
          const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
          console.log("updated x axis with min: ", formattedStartDate, " and max: ", formattedEndDate);
          
          (this.chart.chart.options.scales as any)['x'].min = formattedStartDate;
          (this.chart.chart.options.scales as any)['x'].max = formattedEndDate;


          this.chart.chart.update();
      }
    }
    else{

    }
  }
  }


  updateData(data: Data){
    const dialogRef = this.dialogRef.open(UpdateDialogComponent, {
      data: {entityType: 'data',
             entityData: data}});
    dialogRef.afterClosed().subscribe(() => {

      this.sharedDataService.refreshDataList();
      this.chart?.update();
    });
  }

  deleteData(data: Data){
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: {entity: 'data'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadingService.loadingOn();
        this.api.deleteData(data.id).subscribe({
          next: (data: any) => {
            console.log("Data deleted: " + data);
            this.loadingService.loadingOff();
            this.sharedDataService.refreshDataList();
            this.chart?.update();
          },
          error: (e) => {
            console.log("Error deleting data: " + e);
            this.loadingService.loadingOff();
          }
        });
      }
    });
  }

  updateGoal(){
    console.log("Updating goal: " + this.goal.id);
    const dialogRef = this.dialogRef.open(UpdateDialogComponent, {
      data: {entityType: 'goal',
             entityData: this.goal
      }
    });


  }

  deleteGoal(){
    console.log("Deleting goal: " + this.goal.id);
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: {entity: 'goal'}
    
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadingService.loadingOn();
        this.api.deleteGoal(this.goal.id).subscribe({
          next: (data: any) => {
            console.log("Goal deleted: " + data);
            this.loadingService.loadingOff();
            this.router.navigate(['/student-view']);
          },
          error: (e) => {
            console.log("Error deleting goal: " + e);
            this.loadingService.loadingOff();
          }
        });
      }
    });
  }

  openCreateDataDialog(){
    this.dialogRef.open(CreateDataDialogComponent);
  }
}
