import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimein } from '../timein';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-timeincurrent',
  templateUrl: './timeincurrent.component.html',
  styleUrls: ['./timeincurrent.component.css']
})
export class TimeincurrentComponent implements OnInit {

  timeinDetails: ITimein[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit() {


    this.usersService
      .gettimeincurrent()
      .subscribe(
        (data: ITimein[]) => { this.timeinDetails = data }
      );

  }

}
