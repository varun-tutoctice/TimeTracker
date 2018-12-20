import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimein} from '../timein';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-gettimein',
  templateUrl: './gettimein.component.html',
  styleUrls: ['./gettimein.component.css']
})
export class GettimeinComponent implements OnInit {
  p: number = 1;
  timeinDetails: ITimein[];
  currentDate : any;
  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService) {
      
     }

  ngOnInit() {
  
    this.usersService
    .gettimein()
    .subscribe(
      (data: ITimein[]) => {this.timeinDetails = data;});

  }


}
