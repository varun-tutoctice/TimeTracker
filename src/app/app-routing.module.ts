import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EloginComponent } from './auth/elogin/elogin.component';
import { EsignupComponent } from './auth/esignup/esignup.component';
import { AloginComponent } from './auth/alogin/alogin.component';
import { AsignupComponent } from './auth/asignup/asignup.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LogoutComponent } from './emp-dashboard/logout.component';
import { PasswordComponent } from './emp-dashboard/password/password.component';
import { ProfileComponent } from './emp-dashboard/profile/profile.component';
import { AuthGuard } from './emp-dashboard/auth-guard.service';
import { AuthadminGuard } from './admin-dashboard/authadmin-guard.service';
import { AlogoutComponent } from './admin-dashboard/alogout.component';
import { TimeComponent } from './emp-dashboard/time/time.component';
import { ApasswordComponent } from './admin-dashboard/apassword/apassword.component';
import { AprofileComponent } from './admin-dashboard/aprofile/aprofile.component';
import { DashboardComponent } from './admin-dashboard/dashboard/dashboard.component';
import { GetusersComponent } from './admin-dashboard/getusers/getusers.component';
import { GettimeinComponent } from './admin-dashboard/gettimein/gettimein.component';
import { GettimeoutComponent } from './admin-dashboard/gettimeout/gettimeout.component'
import { TimeincurrentComponent } from './admin-dashboard/timeincurrent/timeincurrent.component';
import { TimeoutcurrentComponent } from './admin-dashboard/timeoutcurrent/timeoutcurrent.component';
import { TimeinoutfullComponent } from './admin-dashboard/timeinoutfull/timeinoutfull.component';
import { UserdetailComponent } from './admin-dashboard/userdetail/userdetail.component';

const routes: Routes = 
[
  {
    path:'auth', 
    component: AuthComponent,
    children: [
      { path:'elogin', component: EloginComponent },
      { path:'esignup', component: EsignupComponent },
      { path:'alogin', component: AloginComponent },
      { path:'asignup', component: AsignupComponent },
    ]
  },
  {
    path:'employee',
    component: EmpDashboardComponent,
    canActivate: [ AuthGuard],
    children: [
      { path:'', canActivate: [AuthGuard], component: TimeComponent},
      { path:'eprofile', canActivate: [ AuthGuard], component: ProfileComponent },
      { path:'epassword', canActivate: [ AuthGuard], component: PasswordComponent },

    ]
  },
  { path: 'elogout', canActivate: [ AuthGuard], component: LogoutComponent },
  { path: 'alogout', canActivate: [ AuthadminGuard], component: AlogoutComponent },
  {
    path:'dashboard',
    component: AdminDashboardComponent,
    canActivate: [ AuthadminGuard],
    children: [
      { path:'', canActivate: [ AuthadminGuard], component: DashboardComponent },
      { path:'aprofile', canActivate: [ AuthadminGuard], component: AprofileComponent },
      { path:'apassword', canActivate: [ AuthadminGuard], component: ApasswordComponent },
      { path:'ausers', canActivate: [ AuthadminGuard], component: GetusersComponent },
      { path:'timeindetails', canActivate: [ AuthadminGuard], component: GettimeinComponent },
      { path:'timeoutdetails', canActivate: [ AuthadminGuard], component: GettimeoutComponent},
      { path:'timeincurrent', canActivate: [ AuthadminGuard], component: TimeincurrentComponent },
      { path:'timeoutcurrent', canActivate: [ AuthadminGuard], component: TimeoutcurrentComponent},
      { path:'timeinout', canActivate: [ AuthadminGuard], component: TimeinoutfullComponent},
      { path:'userdetail/:userid', canActivate: [AuthadminGuard], component: UserdetailComponent},
    ]
  },
  { path: '', redirectTo: 'auth/elogin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/elogin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = 
[
  AuthComponent,
  EloginComponent,
  EsignupComponent,
  AloginComponent,
  AsignupComponent,
  EmpDashboardComponent,
  AdminDashboardComponent,
  LogoutComponent,
  PasswordComponent,
  ProfileComponent,
  TimeComponent,
  AlogoutComponent,
  ApasswordComponent,
  AprofileComponent,
  DashboardComponent,
  GetusersComponent,
  GettimeinComponent,
  GettimeoutComponent,
  TimeincurrentComponent,
  TimeoutcurrentComponent,
  TimeinoutfullComponent,
  UserdetailComponent,
]
