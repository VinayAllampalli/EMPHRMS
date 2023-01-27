import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent implements OnInit {
  empcodes: Array<any> = [];
  items: Array<any> = [];
  form:any;
  date1: any=Date;
  date2: any=Date;
  currentDate: any;
  newItem: any = {};
  sDate:any;
  eDate:any;
  checked: boolean = false;
  status=['Todo'];
  empcode:any;
  companyId:any;
 
 
  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private ngxService:NgxUiLoaderService,
    public backend:BackendService,
    public router:Router,
    ) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formbuilder()
    this.getemployees();
    this.empcode=localStorage.getItem('empcode');
    this.companyId = localStorage.getItem('CompId')
  }
  formbuilder() {
    this.form = this.fb.group({
      TaskDescription: [''],
      newItemName:['']
    });
  }
  addItems() {
    this.items.push(this.newItem);
    console.log(this.items);
    for (let i = 0; i < this.items.length; i++){
      this.sDate=moment( this.items[i].startdate).format('DD/MMM/YYYY');
      this.eDate=moment( this.items[i].enddate).format('DD/MMM/YYYY');
      console.log(this.sDate,this.eDate)
    }
    this.newItem = {};
  }
  removeItem(index: any) {
    this.items.splice(index, 1);
    console.log(this.items);
    this.newItem = {}; 
  }
  getemployees(){
    let empCode=localStorage.getItem('empcode')
    this.backend.getEmployeesBasedonId(empCode).subscribe((data:any)=>{
      let res = data.result
      console.log(res)
      for (let i = 0; i < res.length; i++){
        let vin=  res[i].empcode
        this.empcodes.push(vin)
      }
    })
  }
  submit(){
    let obj = this.items  
    console.log("----->",obj)
    this.backend.taskCreation(this.companyId,this.empcode,obj).subscribe(data=>{
      console.log(data)
    })
  }
}
