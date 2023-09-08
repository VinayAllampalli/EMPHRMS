import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-org-creation',
  templateUrl: './org-creation.component.html',
  styleUrls: ['./org-creation.component.css']
})
export class OrgCreationComponent implements OnInit {
  form:any;
  hide = true;
  hide1 = true;
  companyId:any;

  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    public backend:BackendService,
    public router:Router) { }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder() {
  this.form = this.fb.group({
    companyName:['', [Validators.required]],
    companyBranch:['', [Validators.required]],
    companyAddress:['', [Validators.required]],
    companyMailId: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
    companyPhoneNo: ['',[
    Validators.required,
     Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[1-9]{1}[0-9]{9}'),
  ]],
  phoneNo: ['',[
    Validators.required,
     Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[1-9]{1}[0-9]{9}'),
  ]],
  fullName: ['', [Validators.required],],
  password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
  adminMailId:  ['', [Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
})
  }
  get password() {
    return this.form.get('password')
  }
  submitform(){
    if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else{
      let temp = this.form.value
      let obj: any = {};
    
      obj.companyName = temp.companyName;
      obj.companyBranch = temp.companyBranch;
      obj.companyAddress = temp.companyAddress;
      obj.companyMailId = temp.companyMailId;
      obj.companyPhoneNo = temp.companyPhoneNo;
      obj.adminName = temp.fullName;
      obj.adminphnNo = temp.phoneNo
      obj.adminMailId = temp.adminMailId;
      obj.adminPassword = temp.password;
      this.backend.company(obj).subscribe((res:any)=> {
        console.log("----->",res);
        if (res.success == true) {
          this.snackbar.open(res.message, 'ok', {
                      duration: 3000,
                      panelClass: ['blue-snackbar'],
                    }); 
                  }
                  this.router.navigate(['header/dashboard']); 
      })
    }
  }
}
