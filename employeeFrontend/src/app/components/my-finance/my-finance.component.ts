import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-my-finance',
  templateUrl: './my-finance.component.html',
  styleUrls: ['./my-finance.component.css'],

})
export class MyFinanceComponent implements OnInit{
  emojiForm:any;
  ReadMore:boolean = true
  visible:boolean = false
  postdata: any;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder() { 
  this.emojiForm = this.fb.group({
    inputField: ['', [Validators.required],],
  })
}
  addEmoji($event:any){
    let data = this.emojiForm.get('inputField');
    data.patchValue(data.value + $event.emoji.native)
  }
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }
  post(){
    console.log(this.postdata)
   
  }
}
