import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';
import { invalid } from 'moment';


@Component({
  selector: 'app-my-finance',
  templateUrl: './my-finance.component.html',
  styleUrls: ['./my-finance.component.css'],

})
export class MyFinanceComponent implements OnInit {
  form: any;
  form1:any;
  form2:any;
  Feed:any;
  comp:any;
 
  constructor(private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public backend: BackendService,
    public router: Router) { }

  ngOnInit(): void {
    this.formbuilder();
    this.comp=localStorage.getItem('CompId')
  }
  formbuilder() {
    this.form = this.fb.group({
      basic: ['', [Validators.required]],
      convencyAllowance: ['', [Validators.required]],
      HRA: ['', [Validators.required]],
      medicalAllowance: ['', [Validators.required]],
      dearnessAllowance: ['', [Validators.required]],
      educationAllowance: ['', [Validators.required]],
      splAllowance: ['', [Validators.required]],
    })
      this.form1 = this.fb.group({
      pfEmployee: ['', [Validators.required]],
      pfEmployer: ['', [Validators.required]],
      insurance: ['', [Validators.required]],
      gratuity: ['', [Validators.required]],
      esi: ['', [Validators.required]],
    })
    this.form2 = this.fb.group({
      totalCtcPerMonth: ['', [Validators.required]],
      EmpCode: ['', [Validators.required, Validators.minLength(4),
        Validators.maxLength(4),],],
    })
    
  }
  submitform() {
    if(this.form.valid && this.form1.valid && this.form2.valid){
    let sum = 0;
    const formValue = this.form.value;
    // sum += formValue.HRA + formValue.basic + formValue.convencyAllowance + formValue.dearnessAllowance + formValue.educationAllowance + formValue.esi + formValue.gratuity + formValue.insurance + formValue.medicalAllowance + formValue.pfEmployee + formValue.pfEmployer + formValue.splAllowance ;
    //  we have one more method Object.values()
    // objects don't have a map method. To convert the object into an array, you can use the Object.values() method and then use the map method on the resulting array.
    
    Object.values(formValue).forEach((value: any) => {
      sum += value;
      console.log("-->",sum);
    })
    let CTC =  Object.values(this.form2.value);
    this.Feed = CTC[0]
    console.log(this.Feed)
    if(sum==this.Feed){
      let temp = this.form.value
      let temp1 = this.form1.value
      let temp2 = this.form2.value
      let obj: any = {}; 
      obj.basic = temp.basic;
      obj.convencyAllowance = temp.convencyAllowance; 
      obj.HRA = temp.HRA;
      obj.medicalAllowance = temp.medicalAllowance;
      obj.dearnessAllowance = temp.dearnessAllowance;
      obj.educationAllowance = temp.educationAllowance;
      obj.splAllowance = temp.splAllowance;
      obj.pfEmployee = temp1.pfEmployee;
      obj.pfEmployer = temp1.pfEmployer;
      obj.insurance = temp1.insurance;
      obj.gratuity = temp1.gratuity;
      obj.esi = temp1.esi;
      obj.totalCtcPerMonth = temp2.totalCtcPerMonth;
      obj.EmpCode = temp2.EmpCode;

      this.backend.Earnings(this.comp,obj).subscribe((data)=>{
        console.log(data)
      })
    }
    else{
      this.snackbar.open( "Total Ctc and Total Earnings are not equal",'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      }); 
    }
   
  }
  else{
    this.snackbar.open( "Please fill all feilds",'ok', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    }); 
  }
}
}



