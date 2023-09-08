import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css']
})
export class CheckInOutComponent implements OnInit {
  name: any;
  empcode: any;
  dept: any;
  date: any;
  clicked: Boolean = false;
  longitude: any;
  latitude: any;
  IpAddress: any;
  location: any;


  events: any = [
    { title: 'event 1', date: '2023-01-01', color: 'green', checkInTime: '12:00am' },
    { title: 'event 2', date: '2023-01-02', color: 'yellow', checkInTime: '12:00am' }
  ]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // weekends: false, 
    events: this.events
  };
  date9 = Date();
  value: any;
  Onlydate: any;
  isHidden = false;
  showit: boolean = false;
  currentIdx = -1;
  len: any;

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.empcode = localStorage.getItem('empcode');
    this.dept = localStorage.getItem('dept');
    this.AlreadyChekIn();
    this.systemApi();

    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    this.date = `${year}/${month}/${date}`


    this.getDefaultData();
  }

  checkInOut(x: any) {
    console.log(x);
    let value = x;
    let obj: any = {};
    obj.longitude = this.longitude;
    obj.latitude = this.latitude;
    obj.IpAddress = this.IpAddress;
    obj.location = this.location
    console.log(obj)
    this.backend.checkInOut(value, this.empcode, obj).subscribe(data => {
      console.log(data)
      window.location.reload();

    })
  }
  AlreadyChekIn() {
    this.backend.AlreadyChekIn(this.empcode).subscribe((data: any) => {
      let value = data.success
      console.log(value)
      if (value == true) {
        this.clicked = true
      }

    })
  }
  systemApi() {
    this.backend.getLocation().subscribe((response: any) => {
      console.log(response);
      this.longitude = response.longitude
      this.latitude = response.latitude
      this.IpAddress = response.ip
      this.location = response.city
    })
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


  submit() {
    this.backend.getattedance(this.empcode, this.date9).subscribe((data: any) => {
      this.value = data.result
      this.len = this.value.length
      console.log(this.value)
      this.value = this.value.map((vin: any) => {
        vin.log_date = moment(vin.log_date).format('DD/MM/YYYY');
        return vin;
      })
      // for (let i = 0; i < this.value.length; i++){
      //  this.value[i]['Onlydate'] = moment(this.value[i].log_date).format('DD/MM/YYYY');
      //  console.log(this.Onlydate)
      // }
    })
  }
  show(i: any) {
    this.showit = true;
    this.currentIdx = i;

  }
  hide(i: any) {
    this.showit = false;
    this.currentIdx = i;
  }
}
