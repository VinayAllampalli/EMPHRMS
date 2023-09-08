import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  value2: any;

  hide = true;
  hide1 = true;

  isLoginForm: boolean = true;

  form1: any;
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
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    });
  }
  get email() {

    return this.form.get('email');
  }
  get password() {
    return this.form.get('password')
  }

  formbuilder1() {
    this.form1 = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    });
  }



  submitform() {
    this.ngxService.start();
    if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else if (this.form.valid) {
      let temp = this.form.value
      let obj: any = {};
      obj.email = temp.email;
      obj.password = temp.password;
      this.backend.login(obj).subscribe((res: any) => {
        console.log("----->", res.data)
        let user = res.data[0]
        localStorage.setItem('empcode', user.empcode);
        localStorage.setItem('email', user.email);
        localStorage.setItem('phoneno', user.phoneno);
        localStorage.setItem('dept', user.department);
        localStorage.setItem('name', user.firstname);
        localStorage.setItem('CompId', user.companyid);
        localStorage.setItem('role', user.role)
        if (res.success == true) {
          this.snackbar.open(res.message, 'ok', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
          });
        }
        this.router.navigate(['header/dashboard']);
      });

    }
    this.ngxService.stop();
  }
  adminLogin() {
    this.isLoginForm = !this.isLoginForm
  }
  adminform() {
    if (!this.form1.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else if (this.form1.valid) {
      let temp = this.form1.value
      let obj: any = {};
      obj.email = temp.email;
      obj.password = temp.password;
      this.backend.adminLogin(obj).subscribe((res: any) => {
        console.log(res)
        let value = res.data[0]
        localStorage.setItem('CompId', value.companyid);
        localStorage.setItem('role', "companyAdmin");
        localStorage.setItem('adminName',value?.adminname);
        if (res.success == true) {
          this.snackbar.open(res.message, 'ok', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
          });
        }
        this.router.navigate(['header/adminDashboard']);
       
      });
    }
  }
}



