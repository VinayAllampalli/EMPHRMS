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
  imageSources: string[] = [
    'assets/images/cal.jpg',
    'assets/images/EP.jpg',
    'assets/images/in.jpg',
    'assets/images/tree.jpg'
  ];

  currentImageIndex: number = 0;
  constructor(private fb:FormBuilder,) { }

  ngOnInit(): void {
    this.formbuilder()
    document.body.addEventListener('keydown', this.onKeyDown.bind(this));
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

  get currentImage(): string {
    console.log('Current image:', this.imageSources[this.currentImageIndex]);
    return this.imageSources[this.currentImageIndex];
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
    if (event.key === 'ArrowRight') {
      this.showNextImage();
    } else if (event.key === 'ArrowLeft') {
      this.showPreviousImage();
    }
  }

  showNextImage() {
    this.currentImageIndex++;
    console.log("clicking on next image ")
    if (this.currentImageIndex >= this.imageSources.length) {
      this.currentImageIndex = 0; // Wrap around to the first image
    }
  }

  showPreviousImage() {
    this.currentImageIndex--;
    console.log("clicking on previous image ")
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imageSources.length - 1; // Wrap around to the last image
    }
  }
}

  

