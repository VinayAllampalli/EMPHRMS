import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderHttpModule, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { material } from './material';
import { PrimeNgModule } from './primeng';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { OrgCreationComponent } from './components/org-creation/org-creation.component';
import { EmpCreationComponent } from './components/emp-creation/emp-creation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { MyFinanceComponent } from './components/my-finance/my-finance.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { IdCardComponent } from './components/id-card/id-card.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PayslipsComponent } from './components/payslips/payslips.component';
import { PayslipGenerstionComponent } from './components/payslip-generstion/payslip-generstion.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { QrgeneratorComponent } from './components/qrgenerator/qrgenerator.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HolidaysListComponent } from './components/holidays-list/holidays-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginWithGoogleComponent } from './components/login-with-google/login-with-google.component';
import { OrganizationTreeComponent } from './components/organization-tree/organization-tree.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HolidaysComponent } from './components/holidays/holidays.component';







const ngxUiLoaderConfig:NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise-fade-rotating",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    CheckInOutComponent,
    TaskCreationComponent,
    OrgCreationComponent,
    EmpCreationComponent,
    ProfileComponent,
    MyTaskComponent,
    LeavesComponent,
    MyFinanceComponent,
    FileUploadComponent,
    IdCardComponent,
    AttendanceComponent,
    PayslipsComponent,
    PayslipGenerstionComponent,
    LeaveApprovalComponent,
    QrgeneratorComponent,
    HolidaysListComponent,
    ForgotPasswordComponent,
    LoginWithGoogleComponent,
    OrganizationTreeComponent,
    AdminDashboardComponent,
    HolidaysComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    material,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PickerModule,
    FullCalendarModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  
    
  
  ],
 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [BackendService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

