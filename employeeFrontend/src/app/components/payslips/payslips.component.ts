import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.css']
})
export class PayslipsComponent implements OnInit {
empcode:any;
res:any;
new:any;
new1:any;
earns:any;
earns1:any;
netpay:any;

headings: Array<any> = ['Basic', 'Convency Allowance', 'HRA', 'Medical Allowance', 'Dearness Allowance', 'Education Allowance', 'Special Allowance'];
headings1:Array<any> =['PF Employee','PF Employer','Gratuity','Insurance','ESI']
  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.empcode=localStorage.getItem('empcode');
    this.getEarnings()
  }

getEarnings(){
  this.backend.getEarn(this.empcode).subscribe((data:any)=>{
    console.log(data)
    this.res = data.result 
    this.new= this.res.map((obj:any) => {
     return Object.values(obj).slice(1,8)
    });
    console.log(this.new)
     this.earns = this.new[0].reduce((a: any, b: any) => +(a) + +(b), 0);
console.log(this.earns); 

this.new1= this.res.map((obj:any) => {
  return Object.values(obj).slice(8,13)
 });
 console.log(this.new1)
  this.earns1 = this.new1[0].reduce((a: any, b: any) => +(a) + +(b), 0);
console.log(this.earns1);

this.netpay = this.earns - this.earns1
console.log(this.netpay)
})}

}

