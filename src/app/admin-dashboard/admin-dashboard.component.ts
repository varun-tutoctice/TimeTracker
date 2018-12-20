import { Component, OnInit } from '@angular/core';
import { AuthadminService } from './authadmin.service';
import { Router, ActivatedRoute } from '@angular/router'; 
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public authadminService: AuthadminService,  private route: ActivatedRoute, private router: Router) { }
  adminObj: any;
  ngOnInit() {
    this.adminObj =  this.authadminService.currentAdmin;
    $(document).ready(function () {
      // Custom JS & jQuery here
      $('.button-collapse').sideNav();
    });
  }
  showUsers(){this.router.navigate(['ausers'], {relativeTo: this.route});}
  showTimein(){this.router.navigate(['timeindetails'], {relativeTo: this.route});}
  showTimeout(){this.router.navigate(['timeoutdetails'], {relativeTo: this.route});}
  showAprofile(){this.router.navigate(['aprofile'], {relativeTo: this.route});}
  showApassword(){this.router.navigate(['apassword'], {relativeTo: this.route});}
  showTimeincurrent(){this.router.navigate(['timeincurrent'], {relativeTo: this.route});}
  showTimeoutcurrent(){this.router.navigate(['timeoutcurrent'], {relativeTo: this.route});}
  showTimeinout(){this.router.navigate(['timeinout'], {relativeTo: this.route});}
  showUserdetailid(){this.router.navigate(['userdetail/:id'], {relativeTo: this.route});}
  
}
