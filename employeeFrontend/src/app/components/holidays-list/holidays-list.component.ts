import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {
  list:any;
  currentYear:any;
  companyId = localStorage.getItem('CompId')
  constructor( private backend:BackendService) { }

  ngOnInit(): void {
    this.getholidays()
  }

  getholidays() {
    this.currentYear = moment().year();
    this.backend.getallholidays(this.currentYear,this.companyId).subscribe((data: any) => {
      this.list = data?.result;
      this.list.sort((a:any, b:any) => {
        const dateA = moment(a.holidaydate, 'YYYY-MM-DD');
        const dateB = moment(b.holidaydate, 'YYYY-MM-DD');
        return dateA.diff(dateB);
      });
    });
  }

}
