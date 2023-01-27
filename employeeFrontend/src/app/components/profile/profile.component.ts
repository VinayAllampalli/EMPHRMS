import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router,ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { IdCardComponent } from '../id-card/id-card.component';

import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  empcode:any;
  res:any;
  images:any;
  pic:any;
  compName:any;
  DOB:any;
  DOJ: any;
  city:any;

  constructor(private backend:BackendService,public router:Router,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.empcode = localStorage.getItem('empcode')
    this.compName=localStorage.getItem('CompName')
    this.getemp();
    this.getimage();
    this.systemApi();
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
      for (let i = 0; i < this.res.length; i++){
        this.DOB = moment(this.res[i].dob).format('DD/MMM/YYYY');
        this.DOJ = moment(this.res[i].doj).format('DD/MMM/YYYY');
      }

    })
  }
  dailog(){
    this.dialog.open(FileUploadComponent, {
      width: '400px',
  })
  }
  idCard(){
    this.dialog.open(IdCardComponent,{
      width: '400px',
      height:'530px'
    })
  }


  systemApi(){
    this.backend.getLocation().subscribe((response:any)=>{
      console.log(response);
      this.city = response.city;
 
    })

  }
}
