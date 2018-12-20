import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimeout } from '../timeout';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-gettimeout',
  templateUrl: './gettimeout.component.html',
  styleUrls: ['./gettimeout.component.css']
})
export class GettimeoutComponent implements OnInit {

  timeoutDetails: ITimeout[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.usersService
    .gettimeout()
    .subscribe(
      (data: ITimeout[]) => {this.timeoutDetails = data}
    );
  }

}
