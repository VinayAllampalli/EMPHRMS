import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css']
})
export class CheckInOutComponent implements OnInit {
  name:any;
  empcode:any;
  dept:any;
  date:any;
  clicked:Boolean=false;

  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem('name');
    this.empcode=localStorage.getItem('empcode');
    this.dept=localStorage.getItem('dept');

    const dateObject = new Date();
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        this.date = `${year}/${month}/${date}`
  }

  checkInOut(x:any){
    console.log(x);
    let value = x
    this.backend.checkInOut(value,this.empcode).subscribe(data=>{
      console.log(data)
   
    })
  
  
  
  }

}
