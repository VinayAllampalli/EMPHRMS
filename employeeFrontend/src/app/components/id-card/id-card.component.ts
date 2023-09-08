import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.css']
})
export class IdCardComponent implements OnInit {
  pic:any
  empcode:any;
  res:any
  company:any;
  compId:any;
  compData:any;
  
  constructor(private backend:BackendService) { }

  ngOnInit(): void {
    this.empcode = localStorage.getItem('empcode')
    this.getimage()
    this.getemp()
    this.company=localStorage.getItem('CompName')
    this.compId = localStorage.getItem('CompId')
    this.getComp()
  }
  getimage(){
    this.backend.getempImage(this.empcode).subscribe((data:any)=>{
      console.log(data)
      let res = data.result
      for(let i=0; i<res.length;i++){
        this.pic=res[i].file
      }
    })
  }
  getemp(){
    this.backend.getemployees(this.empcode).subscribe((data:any)=>{
      this.res = data.result
      console.log(this.res)
    })
  }
  getComp(){
    this.backend.getCompany(this.compId).subscribe((res:any)=>{
      this.compData = res.result
    })
  }

}
