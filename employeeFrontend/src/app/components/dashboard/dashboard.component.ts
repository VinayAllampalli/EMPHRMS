import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router,ActivatedRoute} from '@angular/router';
import { LeavesComponent } from '../leaves/leaves.component';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { MatDialog } from '@angular/material/dialog';
import { HolidaysListComponent } from '../holidays-list/holidays-list.component';

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
  CompName:any;
  emojiForm:any;
  ReadMore:boolean = true
  visible:boolean = false;
  Feed:any;
  postdate: any;
  casualLeaveCount:any;
  sickLeaveCount:any;
  CL: any;
  SL: any;
  empcode: any;
  chartData: any;
  currentYear:any;
  todayHoliday:any;
  upcomingHoliday:any;

  constructor(public datepipe:DatePipe,
    public backend:BackendService,
    private fb:FormBuilder,
    private router:Router, 
    public dialog: MatDialog
   ) { }

  ngOnInit(): void {
  
    this.compId= localStorage.getItem('CompId')
    console.log(this.compId);
   
    this.dob();
    this.doj();
    this.getcompany();
    this.name = localStorage.getItem('name');
    console.log(Date.now())
    this.currentDateTime =this.datepipe.transform((new Date), 'HH:mm');
    this.formbuilder();
    this.getFeed();  
    this.empcode = localStorage.getItem('empcode'); 
    this.getallLeaves();
    this.currentYear = moment().year();
    this.getholidayslist()
   
  

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
        const month = this.monthName[this.dateTime.getMonth()];
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
 getcompany(){
  this.backend.getCompany(this.compId).subscribe((data:any)=>{
  let res = data.result
  for(let i=0;res.length>0;i++){
    this.CompName = res[i].companyname
    localStorage.setItem("CompName",this.CompName);
  }
  })
 }
 formbuilder() { 
  this.emojiForm = this.fb.group({
    post: [''],
  })
}
 addEmoji($event:any){
  let data = this.emojiForm.get('post');
  data.patchValue(data.value + $event.emoji.native)
 
}
onclick()
{
  this.ReadMore = !this.ReadMore; //not equal to condition
  this.visible = !this.visible
}
post(){
  let temp = this.emojiForm.value
  let obj: any = {};
  obj.post = temp.post;
  obj.companyId = this.compId
  obj.name=this.name
  
  this.backend.feed(localStorage.getItem('empcode'),obj).subscribe((data:any)=>{
    console.log(data);
    this.emojiForm.reset()
    this.getFeed()
  })
 
}
getFeed(){
  this.backend.getfeed(this.compId).subscribe((data:any)=>{
  this.Feed = data.result
  
  console.log(this.Feed)

  this.Feed = this.Feed.map((vin:any)=>{
    vin.postdate= moment(vin.postdate).format('DD/MM/YYYY');
    return vin ;
   

   })
  for (let i = 0; i < this.Feed.length; i++){
    this.postdate = moment(this.Feed[i].postdate).format('DD/MMM/YYYY');

  }
  this.router.navigate(['header/dashboard']);

  })
}
getallLeaves() {
  this.backend.allLeaves(this.empcode).subscribe((leavedata: any) => {
    let res = leavedata.result
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      this.CL = res[i].casualleaves;
      this.SL = res[i].sickleave;
      console.log(this.CL)
      console.log(this.SL)
      this.chartData = [
        { value: this.CL, name: 'Casual Leave' },
        { value: this.SL, name: 'Sick Leave' },
      ];
      // create chart
      var chartDom = document.getElementById('main')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption = {
       
          title: {
            text: 'Leave Balance',
            subtext: 'For the year 2023'
          },
          tooltip: {
            trigger: 'axis'
          },
        
        
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['SickLeave', 'casualLeave']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              data: this.chartData,
              itemStyle: {
                color: function(params) {
                  var colors = ['#FFA500', '#203a43']; 
                  return colors[params.dataIndex];
                }
            }
          }
          ]
        };
        
      option && myChart.setOption(option);
    }
     
    })
    }
    leave(){
      this.router.navigate(['header/leaves']);
    }
    clockIn(){
      this.router.navigate(['header/checkInOut'])
    }

    getholidayslist() {
      this.backend.getallholidays(this.currentYear,this.compId).subscribe((data: any) => {
        let list = data?.result;
        let upcomingHoliday = null;
        const currentDate = moment().format('YYYY-MM-DD');
    
        for (let i = 0; i < list.length; i++) {
          const holidayDate = moment(list[i].holidaydate, 'YYYY-MM-DD').format('YYYY-MM-DD');
          console.log(holidayDate);
          if (currentDate === holidayDate) {
            this.todayHoliday = list[i];
            console.log("-->", this.todayHoliday);
          } else if (moment(holidayDate).isAfter(currentDate)) {
            if (!upcomingHoliday || moment(holidayDate).isBefore(upcomingHoliday.holidaydate)) {
              upcomingHoliday = list[i];
            }
          }
        }
        this.upcomingHoliday = upcomingHoliday;
      });
    }

    allHolidays(){
        this.router.navigate(['header/holidays']);
      // this.dialog.open(HolidaysListComponent,{
      //   width:'100%',
      //   height:'100%'
      
      // })
    }
}

    
 



