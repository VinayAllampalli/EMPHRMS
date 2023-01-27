import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  empcode:any;
  res:any;
  values:any;
  assignDate:any;
  selectedValue: any;
  sDate:any;
  eDate:any;
  len:any;
  selectedRow: any;
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
      this.res = data.result
      this.len=this.res.length
      for (let i = 0; i < this.res.length; i++){
        this.assignDate = moment(this.res[i].assigneddate).format('DD/MMM/YYYY');
        this.sDate = moment(this.res[i].startdate).format('DD/MMM/YYYY');
        this.eDate=moment(this.res[i].enddate).format('DD/MMM/YYYY');
        
        
      }
      
    })
  }
  updateTaskStatus(index: any,value:any){
    this.selectedRow = value;
    let taskId=this.selectedRow.taskid
   this.backend.updateStatus(taskId).subscribe(data=>{
   })
   window.location.reload()
    
  }
 
  

}
