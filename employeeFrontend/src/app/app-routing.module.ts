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


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'header',
    component:HeaderComponent,children:[
      {
          path:'',
          redirectTo:'dashboard',
          pathMatch:"full"
      },
      {
        path:"dashboard",
        component:DashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"checkInOut",
        component:CheckInOutComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'empCreation',
        component:EmpCreationComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'orgCreation',
        component:OrgCreationComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'taskCreation',
        component:TaskCreationComponent,
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
