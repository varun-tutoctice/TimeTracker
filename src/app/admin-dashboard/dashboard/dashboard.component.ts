import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimein } from '../timein';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  timeincount;
  timeoutcount;
  usercount;
  p: number = 1;
  timeinDetails: ITimein[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit() {



    this.usersService
      .gettimeincount()
      .subscribe(
        (data => this.timeincount = data)
      );
    this.usersService
      .gettimeoutcount()
      .subscribe(
        (data => this.timeoutcount = data)
      );
    this.usersService
      .getusercount()
      .subscribe(
        (data => this.usercount = data)
      );
    this.usersService
      .gettimeinAlllimit()
      .subscribe(
        (data: ITimein[]) => {

          this.timeinDetails = data;


        },
      );
  }

}
