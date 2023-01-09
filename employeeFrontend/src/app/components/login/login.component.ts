import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any;
  value2:any;

  hide = true;
  hide1 = true;

  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private ngxService:NgxUiLoaderService,
    public backend:BackendService,
    public router:Router) { }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder() {
    this.form = this.fb.group({
      EmpCode: ['', [Validators.required],],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    });
  }
  get EmpCode() {

    return this.form.get('EmpCode');
  }
  get password() {
    return this.form.get('password')
  }
  submitform(){
    this.ngxService.start();
    if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else if(this.form.valid){
      let temp = this.form.value
      let obj: any = {};
      obj.EmpCode = temp.EmpCode;
      obj.password = temp.password;
      this.backend.login(obj).subscribe((res:any)=> {
        console.log("----->",res.data)
        let user = res.data[0]
        localStorage.setItem('empcode',user.empcode);
        localStorage.setItem('email',user.email);
        localStorage.setItem('phoneno',user.phoneno);
        localStorage.setItem('dept',user.department);
        localStorage.setItem('name',user.firstname)
        localStorage.setItem('CompId',user.companyid)
        if (res.success == true) {
          this.snackbar.open(res.message, 'ok', {
                      duration: 3000,
                      panelClass: ['blue-snackbar'],
                    }); 
                  }
                  this.router.navigate(['header']);    
      });
    }
      this.ngxService.stop();
      
    }

}
