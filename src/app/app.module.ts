import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';
import { ToastrService } from './common/toastr.service';
import { AuthGuard } from './emp-dashboard/auth-guard.service';
import { AuthadminGuard } from './admin-dashboard/authadmin-guard.service';
import { AuthService } from './emp-dashboard/auth.service';
import { AuthadminService } from './admin-dashboard/authadmin.service';
import { UserService } from './emp-dashboard/user.service';
import { AdminService } from './admin-dashboard/admin.service';
import { MaterializeModule } from 'angular2-materialize';
import { TimeinService } from "./emp-dashboard/time/timein.service";
import { UsersService } from "./admin-dashboard/users.service";
import {SearchPipe} from './filter.pipe';
import { dateFormatPipe } from './datefilter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleModule } from 'angular2-collapsible';
import { SumPipe } from "./sum.pipe";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchPipe,
    dateFormatPipe,
    SumPipe


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CollapsibleModule,

  ],
  providers: [
    ToastrService, 
    AuthGuard, 
    AuthService, 
    UserService, 
    AuthadminService, 
    AuthadminGuard,
    AdminService,
    TimeinService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
