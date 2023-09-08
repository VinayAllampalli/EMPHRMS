import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  empcode:any;
  res:any;
  res1:any;
  values:any;
  assignDate:any;
  selectedValue: any;
  sDate:any;
  eDate:any;
  len:any;
  selectedRow: any;
  searchText: string = ''; 
  filteredTasks: any;
  disableUpdateButton: boolean = true;
  statusOptions: SelectItem[] = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Todo', value: 'Todo' },
    { label: 'Done', value: 'Done' }
  ];
  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private ngxService:NgxUiLoaderService,
    public backend:BackendService,
    public router:Router,
   ) { }

  ngOnInit(): void {
    this.empcode=localStorage.getItem('empcode');
    this.gettask()
  }

  gettask(){
    this.backend.gettask(this.empcode).subscribe((data:any)=>{
      console.log(data);
      this.res1 = data.result
      this.filterTasks();
      //   this.res = this.res1.map((vin:any)=>{
      //   vin.assigneddate= moment(vin.assigneddate).format('DD/MM/YYYY');
      //   vin.startdate= moment(vin.startdate).format('DD/MM/YYYY');
      //   vin.enddate= moment(vin.enddate).format('DD/MM/YYYY');
      //   return vin ;
      //  })
      // for (let i = 0; i < this.res.length; i++){
      //   this.assignDate = moment(this.res[i].assigneddate).format('DD/MMM/YYYY');
      //   this.sDate = moment(this.res[i].startdate).format('DD/MMM/YYYY');
      //   this.eDate=moment(this.res[i].enddate).format('DD/MMM/YYYY');
        
        
      // }
    })
  }
  filterTasks() {
    this.filteredTasks = this.res1.filter((task: any) =>
      Object.values(task).some((value: any) =>
        String(value).toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
  updateTaskStatus(index: any,value:any){
    this.selectedRow = value;
    let taskId=this.selectedRow.taskid
    let status = this.selectedRow.status
   this.backend.updateStatus(taskId,{ status: status }).subscribe(data=>{
   })
   window.location.reload()
  this.gettask()
  }
  getStatusOptions(currentStatus: string): any[] {
    const options = [currentStatus, ...this.statusOptions.filter(option => option.value !== currentStatus)];
    return options;
  }
}
