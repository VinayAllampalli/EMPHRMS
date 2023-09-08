import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role:any;

  constructor(public router:Router,
    private dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.role=localStorage.getItem('role')
    console.log(this.role)
    if (this.role === 'companyAdmin') {
      this.router.navigateByUrl('/header/adminDashboard');
    } else {
      this.router.navigateByUrl('/header/dashboard');
    }
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['login']);
   }
   checkinOut(){
    this.router.navigate(['header/CheckInOut']);
   }
}
