import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardComponent } from '../dashboard/dashboard.component';



type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  empcode: any;
  chartData: any;
  CL: any;
  SL: any;
  form: any;
  currentDate: any;
  leaveday = ['Fullday', 'Halfday'];
  leaveType = ['SickLeave', 'CasualLeave','PaidLeave']
  totaldays: any;
  days: any;
  res:any;
  len: any;
  
 
 

  constructor(private backend: BackendService, 
    private fb: FormBuilder,
     private datePipe: DatePipe,
      private snackbar: MatSnackBar,
      
      ) {
       
  }

  ngOnInit(): void {
   
    this.currentDate = Date();
    this.formbuilder()
    this.empcode = localStorage.getItem('empcode');
    this.getallLeaves();
    this.getAllmyleaves();
  }

  getallLeaves() {
    this.backend.allLeaves(this.empcode).subscribe((leavedata: any) => {
      let res = leavedata.result
      for (let i = 0; i < res.length; i++) {
        this.CL = res[i].casualleaves;
        this.SL = res[i].sickleave;
      }
 
      // update chart data
      this.chartData = [
        { value: this.CL, name: 'Casual Leave' },
        { value: this.SL, name: 'Sick Leave' },
      ];
      // create chart
      var chartDom = document.getElementById('main')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'left'
        },
        label: {
          show: false,
          position: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            data: this.chartData
          }
        ]
      };
      option && myChart.setOption(option);
     
    });
  }
 
  formbuilder() {
    this.form = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      leaveday: ['', [Validators.required]],
      leaveType: ['', [Validators.required]],
      note: ['', [Validators.required]]
    })
  }

  submitform() {
    if (this.form.valid) {
      let startDate = moment(this.form.get('startDate').value);
      let endDate = moment(this.form.get('endDate').value);
      let leaveDay = this.form.get('leaveday').value;

      let excludeDays = [6, 0]; // 6 = Saturday, 0 = Sunday 
      this.days = endDate.diff(startDate, 'days') + 1;
      if (this.days < 1) {
        this.days = 1;
      }
      // Exclude Saturdays and Sundays
      for (let i = 0; i < this.days; i++) {
        let date = moment(startDate).add(i, 'days');
        if (excludeDays.includes(date.day())) {
          this.days--;
        }
        if (leaveDay === 'Halfday') {
          this.days -= 0.5;


        }
      }
      console.log(this.days)

      let temp = this.form.value
      let obj: any = {};
      obj.typeofleave = temp.leaveType
      obj.startDate = temp.startDate;
      obj.endDate = temp.endDate;
      obj.totalDays = this.days;
      obj.note = temp.note
      // obj.startDate = temp.startDate;

      this.backend.applyLeave(this.empcode, obj).subscribe((data: any) => {
        console.log(data)
        if (data.success == true) {
          this.snackbar.open(data.message, 'ok', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
          });
        }
        this.form.reset()
        this.getallLeaves()
      })
    }
  }
  
  getAllmyleaves(){
    this.backend.getallmyleaves(this.empcode).subscribe((data:any)=>{
      console.log(data)
      this.res = data.result
      this.len=this.res.length
      console.log(this.len)
    
      this.res = this.res.map((vin:any)=>{
        vin.fromdate= moment(vin.fromdate).format('DD/MM/YYYY');
        vin.todate= moment(vin.todate).format('DD/MM/YYYY');
        return vin ;
       })
    })
    }
}