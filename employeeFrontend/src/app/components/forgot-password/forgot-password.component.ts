import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: any;
  form1:any;
  hide = true;
  hide1 = true;
  isResetPasscodeform: boolean = true;
  Value:any;
  empCode:any;

  constructor(private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
    public backend: BackendService,
    public router: Router) { }

  ngOnInit(): void {
    this.formbuilder()
    this.formbuilder1()
  }
  formbuilder() {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.maxLength(4)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    });
  }

  formbuilder1(){
    this.form1 = this.fb.group({
      email: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
    })
  }
  get otp() {

    return this.form.get('otp');
  }
  get password() {
    return this.form.get('password')
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get email(){
    return this.form1.get('email')
  }

  submitform1(){
    this.isResetPasscodeform = false;
    if(this.form1.valid){
      let temp = this.form1.value
      let obj :any={};
      obj.email = temp.email
      this.backend.otpGenrator(obj).subscribe((data:any)=>{
      console.log(data)
      localStorage.setItem("Value",data?.value);
      localStorage.setItem("email",obj.email);
      if (data.success == true) {
        this.snackbar.open(data.message, 'ok', {
                    duration: 3000,
                    panelClass: ['blue-snackbar'],
                  }); 
                  
                }
      }
      )
    }
  }
  submitform() {
    if (this.form.valid && this.password?.value === this.confirmPassword?.value) {
this.empCode = localStorage.getItem("email")
this.Value = localStorage.getItem("Value")
      // Submit form logic here
      console.log("valid")
      let temp = this.form.value
      let obj: any = {};
      obj.password = temp.password;
      obj.otp = temp.otp;
      this.backend.forgotPasscode(this.empCode,this.Value,obj).subscribe((data: any) => {
        if (data.success == true) {
          this.snackbar.open(data.message, 'ok', {
                      duration: 3000,
                      panelClass: ['blue-snackbar'],
                    }); 
                  }
                  localStorage.clear()
                  this.router.navigate(['/login']);    
      })

    }
    else if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else {
      this.snackbar.open('Please Recheck the passwords', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
  }


}
