import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service'; 
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
form:any;
currentDate:any;
holidays:any;
holiday:any;
index: number = 0;
companyId = localStorage.getItem('CompId') ;
currentYear = moment().year();
useSelect: boolean = true;

  constructor(private fb: FormBuilder,
    public backend: BackendService,
    public router : Router) { }

  ngOnInit(): void {
    this.currentDate = Date();
    this.getAllMasterHolidays();
    this.formbuilder();
    this.getHolidays();
  }
  
  formbuilder() {
    this.form = this.fb.group({
      Holiday: ['', [Validators.required]],
      HolidayDate: ['', [Validators.required],],
    })
  }

  getAllMasterHolidays(){
    this.backend.getAllmasterHolidays().subscribe((result:any) =>{
      this.holidays = result?.data
    })
  }
  toggleField() {
    this.useSelect = !this.useSelect;
    this.form.patchValue({
      Holiday: '', // Reset selected value
      HolidayDate: '' // Reset date value
    });
  }

  submitform(){
    let temp = this.form.value;
    let obj: any = {};
    if (this.useSelect) {
      obj.HolidayName = temp.Holiday?.holidayname;
      obj.HolidayId = temp.Holiday?.id;
      obj.HolidayDate = temp.HolidayDate;
    } else {
      obj.HolidayName = temp.Holiday; // Assuming you add a new input field for HolidayName
      obj.HolidayDate = temp.HolidayDate;
    }
    this.backend.addHolidays(obj,this.companyId).subscribe()
    window.location.reload();
  }

  getHolidays(){

    this.backend.getallholidays(this.currentYear,this.companyId).subscribe((data:any)=>{
      console.log(data)
      this.holiday = data?.result;
      this.holiday.forEach((item:any) => {
        item.index = ++this.index; // Assign and increment the index
    });
       })
  }
 delete(id: number, name: string){
  let obj: any = {};
  obj.holidayName = name
  obj.id = id
  this.companyId = localStorage.getItem('CompId')
  console.log(obj)
  this.backend.deleteholiday(this.companyId,id).subscribe((data:any)=>{
    console.log(data)
    window.location.reload();
  })
 
 }
}
