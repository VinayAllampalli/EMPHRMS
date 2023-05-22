import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.component.html',
  styleUrls: ['./qrgenerator.component.css']
})
export class QrgeneratorComponent implements OnInit {
  @ViewChild('qrCode')
  qrCode!: ElementRef;
  form:any;
  showQRCode = false;
  constructor(private fb:FormBuilder,) { }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder() {
    this.form = this.fb.group({
      firstName: [''],
      lastName:['']
    });
  }
  get qrData() {
    const { firstName, lastName } = this.form.value;
    return `'FirstName' : ${firstName}
            'LastName' : ${lastName} 
            'vmnvkjdsnkjvndk'` ;
  }
  generateQR(){
    this.showQRCode = true;
    const canvas = this.qrCode.nativeElement.querySelector('canvas');
    const imageDataUrl = canvas.toDataURL();
    console.log(imageDataUrl);
  }

  
}
