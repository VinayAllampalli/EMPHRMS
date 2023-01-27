import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router,ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  images:any;
  empcode:any

  constructor(private backend:BackendService,public router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empcode = localStorage.getItem('empcode')
  }
  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log("--->",this.images.name)
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);
    console.log("--->",this.images)

    this.backend.image(formData,this.empcode).subscribe(res=>{
      console.log(res)
 
      this.router.navigate(["/login"])
    })  
  }

}
