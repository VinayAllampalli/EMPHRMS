import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  name:any;
  x:any;
  currentDateTime:any;
  compId:any;
  totalEmployees:any;
  presentEmployees:any;
  absentEmployees:any;
  chartData: any;

  constructor(public datepipe:DatePipe,public backend: BackendService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('adminName');
    this.compId = localStorage.getItem('CompId');
    this.getTodayAttedance()

    this.currentDateTime =this.datepipe.transform((new Date), 'HH:mm');
    if(this.currentDateTime > '00:00' && this.currentDateTime < '12:00'){
      this.x = "Good Morning"
    }
    else if(this.currentDateTime >'12:01' && this.currentDateTime < '16:00'){
      this.x="Good Afternoon"
    }
    else if (this.currentDateTime > "16:01" && this.currentDateTime < '23:59'){
    this.x="Good Evening"
    }   
  }
  getTodayAttedance(){
    this.backend.getTotalemployessAttedanceForToday(this.compId).subscribe((value:any)=>{
      this.presentEmployees = value?.presentEmp?.length
      this.absentEmployees = value?.absentEmp?.length
       value?.totalemployees.map((TE:any)=>{
        this.totalEmployees= TE?.count
      })
  

      // update chart data
      this.chartData = [
        { value: this.totalEmployees, name: 'Employees'},
        { value: this.presentEmployees, name: 'Present' },
        { value: this.absentEmployees, name: 'Absent',itemStyle:{color:'red'}},
        
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
            name: 'Total',
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
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            data: this.chartData
          }
        ]
      };
      option && myChart.setOption(option);
     
    });
  }
}
