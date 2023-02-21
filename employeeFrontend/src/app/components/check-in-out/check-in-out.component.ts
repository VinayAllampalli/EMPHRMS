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
  longitude:any;
  latitude:any;
  IpAddress:any;
  location: any;

  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem('name');
    this.empcode=localStorage.getItem('empcode');
    this.dept=localStorage.getItem('dept');
    this.AlreadyChekIn();
    this.systemApi();

    const dateObject = new Date();
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        this.date = `${year}/${month}/${date}`
  }

  checkInOut(x:any){
    console.log(x);
    let value = x;
    let obj: any = {};
      obj.longitude = this.longitude;
      obj.latitude =this.latitude;
      obj.IpAddress=this.IpAddress;
      obj.location = this.location
      console.log(obj)
    this.backend.checkInOut(value,this.empcode,obj).subscribe(data=>{
      console.log(data)
      window.location.reload();
      
    })
  }
  AlreadyChekIn(){
  this.backend.AlreadyChekIn(this.empcode).subscribe((data:any)=>{
    let value = data.success
    console.log(value)
    if(value==true){
      this.clicked=true
    }

  })
}
systemApi(){
  this.backend.getLocation().subscribe((response:any)=>{
    console.log(response);
    this.longitude = response.longitude
    this.latitude = response.latitude
    this.IpAddress = response.ip
    this.location = response.city
  })
}
}
