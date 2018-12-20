import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
declare var jquery:any;
declare var $ :any;

import { AuthService } from './auth.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  showEtime(){this.router.navigate(['/employee'], {relativeTo: this.route});}
  showEprofile(){this.router.navigate(['eprofile'], {relativeTo: this.route});}
  showEpassword(){this.router.navigate(['epassword'], {relativeTo: this.route});}
  
}
