import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  events:any = [
    { title: 'event 1', date: '2023-01-01',color:'green',checkInTime:'12:00am' },
    { title: 'event 2', date: '2023-01-02',color:'yellow',checkInTime:'12:00am' }
  ]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // weekends: false, 
    events :this.events
  };
empcode:any;
  date9=Date();
  value:any;
  Onlydate:any;
  isHidden = false;
  showit:boolean = false;
  currentIdx = -1;
  len:any;
  constructor(private backend:BackendService) { }

  ngOnInit(): void {
    this.empcode=localStorage.getItem('empcode');
    this.getDefaultData();
  }
  getDefaultData(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const defaultDate = currentYear + '-' + currentMonth;

    this.backend.getattedance(this.empcode, defaultDate).subscribe((data: any) => {
      this.value = data.result;
      this.len = this.value.length;

      this.value = this.value.map((vin: any) => {
        vin.log_date = moment(vin.log_date).format('DD/MM/YYYY');
        return vin;
      });
    });
  }


  submit(){
    this.backend.getattedance(this.empcode,this.date9).subscribe((data:any)=>{
    this.value = data.result 
    this.len=this.value.length
   console.log(this.value)
   this.value = this.value.map((vin:any)=>{
    vin.log_date= moment(vin.log_date).format('DD/MM/YYYY');
    return vin ;
   })
      // for (let i = 0; i < this.value.length; i++){
      //  this.value[i]['Onlydate'] = moment(this.value[i].log_date).format('DD/MM/YYYY');
      //  console.log(this.Onlydate)
      // }
    })
  }
  show(i:any){
    this.showit= true; 
    this.currentIdx = i;
 
  }
  hide(i:any){
      this.showit= false; 
      this.currentIdx = i;
  }
}
