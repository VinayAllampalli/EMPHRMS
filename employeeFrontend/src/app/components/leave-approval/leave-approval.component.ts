import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit {
  empcode:any;
  res:any;
  len: any;
  selectedRow: any;

  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.empcode=localStorage.getItem('empcode');
    this.getAppliedLeaves();
  }
 
  getAppliedLeaves(){
    this.backend.getappliedLeavesFromEmployees(this.empcode).subscribe((data:any)=>{
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
  updateleaveStatus(index: any,value:any,status: any){
    this.selectedRow = value;
    // console.log(this.selectedRow)
    // console.log(status)
    let obj: any = {};
    obj.action = status
    let leaveid=this.selectedRow.leaveid 
    console.log(leaveid)
    this.backend.UpdateLeaveStatus(leaveid,obj).subscribe(res=>{
      console.log(res)
    })
    this.getAppliedLeaves()
  }
}
