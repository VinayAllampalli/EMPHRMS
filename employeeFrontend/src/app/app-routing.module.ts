import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { EmpCreationComponent } from './components/emp-creation/emp-creation.component';
import { OrgCreationComponent } from './components/org-creation/org-creation.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyFinanceComponent } from './components/my-finance/my-finance.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { IdCardComponent } from './components/id-card/id-card.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { PayslipsComponent } from './components/payslips/payslips.component';
import { PayslipGenerstionComponent } from './components/payslip-generstion/payslip-generstion.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { QrgeneratorComponent } from './components/qrgenerator/qrgenerator.component';
import { HolidaysListComponent } from './components/holidays-list/holidays-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginWithGoogleComponent } from './components/login-with-google/login-with-google.component';
import { OrganizationTreeComponent } from './components/organization-tree/organization-tree.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HolidaysComponent } from './components/holidays/holidays.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
     path:"loginWithGoogle",
     component:LoginWithGoogleComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'orgCreation',
    component: OrgCreationComponent,
  },


  {
    path: 'header',
    component: HeaderComponent, children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:"adminDashboard",
        component:AdminDashboardComponent
      },
      {
        path: "checkInOut",
        component: CheckInOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empCreation',
        component: EmpCreationComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'taskCreation',
        component: TaskCreationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Finance',
        component: MyFinanceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'task',
        component: MyTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leaves',
        component: LeavesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "fileupload",
        component: FileUploadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Idcard',
        component: IdCardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'payslips',
        component: PayslipsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'payslipGeneration',
        component: PayslipGenerstionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leavesApproval',
        component: LeaveApprovalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'QRCODE',
        component: QrgeneratorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'holidayslist',
        component: HolidaysListComponent,
        canActivate: [AuthGuard]

      },
      {
        path:'organizationTree',
        component:OrganizationTreeComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'holidays',
        component:HolidaysComponent,
        canActivate:[AuthGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
