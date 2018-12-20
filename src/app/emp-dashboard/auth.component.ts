import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    $(".button-collapse").sideNav();
  }
  showElogin(){this.router.navigate(['elogin'], {relativeTo: this.route});}
  showEsignup(){this.router.navigate(['esignup'], {relativeTo: this.route});}
  showAlogin(){this.router.navigate(['alogin'], {relativeTo: this.route});}
  showAsignup(){this.router.navigate(['asignup'], {relativeTo: this.route});}
}
