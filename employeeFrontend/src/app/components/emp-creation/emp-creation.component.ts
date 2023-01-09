import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-emp-creation',
  templateUrl: './emp-creation.component.html',
  styleUrls: ['./emp-creation.component.css']
})
export class EmpCreationComponent implements OnInit {
form:any;
hide = true;
hide1 = true;
currentDate: any;
gender = ["Male","Female"];
role=['Admin','Manager','TL','Employee'];
  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    public backend:BackendService,
    public router:Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formbuilder()
  }
 
  formbuilder() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required],],
      email: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
      phoneNo: ['',[
        Validators.required,
         Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ]],
      DOB: ['', [Validators.required],],
      FatherName: ['', [Validators.required],],
      gender:['', [Validators.required],],
      address:['', [Validators.required],],
      DOJ: ['', [Validators.required],],
      role:['', [Validators.required],],
      EmpCode:['', [Validators.required,Validators.minLength(4),
        Validators.maxLength(4),],],
      department:['', [Validators.required,],],
      ReportingManager:[],
      ReportingMangerID:[],
      PanNumber:['', [Validators.required,Validators.minLength(10),
        Validators.maxLength(10),],],
      UanNumber:['', [Validators.required,Validators.minLength(12),
        Validators.maxLength(12),],],
      AadharNumber:['', [Validators.required,Validators.minLength(16),
        Validators.maxLength(16),],],
      bankAccNumber:['', [Validators.required,Validators.minLength(15),
        Validators.maxLength(15),],],
      bankIfscCode:['', [Validators.required],],
      bankName:['', [Validators.required],],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    })
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
      obj.firstName = temp.firstName;
      obj.lastName = temp.lastName;
      obj.email = temp.email;
      obj.phoneNo = temp.phoneNo;
      obj.DOB = temp.DOB;
      obj.FatherName = temp.FatherName;
      obj.gender = temp.gender;
      obj.address = temp.address;
      obj.DOJ = temp.DOJ;
      obj.role = temp.role;
      obj.EmpCode = temp.EmpCode;
      obj.department = temp.department;
      obj.ReportingManager = temp.ReportingManager;
      obj.ReportingMangerID = temp.ReportingMangerID;
      obj.PanNumber = temp.PanNumber;
      obj.UanNumber = temp.UanNumber;
      obj.AadharNumber = temp.AadharNumber;
      obj.bankAccNumber = temp.bankAccNumber;
      obj.bankIfscCode = temp.bankIfscCode;
      obj.bankName = temp.bankName;
      obj.password = temp.password;
      obj.companyid=localStorage.getItem('CompId');
      console.log(obj)
      this.backend.register(obj).subscribe((res:any)=> {
        console.log("----->",res.data);
      })
    }
  }
}