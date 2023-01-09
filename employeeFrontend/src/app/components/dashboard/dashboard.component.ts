import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  text: any;
  dateTime = new Date();
  date:any;
  dayName:any;
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  monthName=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  x:any;
  currentDateTime:any;
  name:any;
  panelOpenState = false;
  birthday:any;
  todayDob: any;
  work:any;
  todayDoj: any;
  compId:any;
  constructor(public datepipe:DatePipe,public backend:BackendService) { }

  ngOnInit(): void {
     this.compId= localStorage.getItem('CompId')
    this.dob();
    this.doj()
    this.name = localStorage.getItem('name');
    console.log(Date.now())
    this.currentDateTime =this.datepipe.transform((new Date), 'HH:mm');
  
    console.log(this.currentDateTime);
  
    if(this.currentDateTime > '00:00' && this.currentDateTime < '12:00'){
      this.x = "Good Morning"
  
  
    }
    else if(this.currentDateTime >'12:01' && this.currentDateTime < '16:00'){
      this.x="Good Afternoon"
      
      
    }
    else if (this.currentDateTime > "16:01" && this.currentDateTime < '23:59'){
    this.x="Good Evening"
    }   
    const date = this.dateTime.getDate();
        const month = this.monthName[this.dateTime.getMonth() + 1];
        const year = this.dateTime.getFullYear();
        const day = this.weekday[this.dateTime.getDay()];
        this.date = `${date} ${month}, ${year}`
        this.dayName=`${day}`
   this.startClock();
  }

  startClock(){
    interval(1).subscribe(data=>{
      this.dateTime = new Date()  
    })
  }
  dob(){
   
    this.backend.DOB(this.compId).subscribe((res:any)=> {
      this.todayDob = res.result.length
      this.birthday = res.result
      console.log(this.birthday)    
    })  }
 doj(){

    this.backend.DOJ(this.compId).subscribe((res:any)=> {
      this.todayDoj = res.result.length
      this.work = res.result
      console.log("--->",this.work)    
    }) 

 }
}
