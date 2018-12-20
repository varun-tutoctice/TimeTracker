import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { AuthadminService } from './authadmin.service';

@Component({
  template: ''
})

export class AlogoutComponent implements OnInit {
  
    constructor(private authadminService: AuthadminService,
        private router: Router,
        private toastr: ToastrService) { 
    }

    ngOnInit(){
        this.authadminService.alogout();
        this.toastr.success('You have been logged out.');
        this.router.navigate(['auth/alogin']);
    }

}