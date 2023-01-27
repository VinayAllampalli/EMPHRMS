import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role:any;

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.role=localStorage.getItem('role')
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['login']);
   }
   checkinOut(){
    this.router.navigate(['header/CheckInOut']);
   }

}
