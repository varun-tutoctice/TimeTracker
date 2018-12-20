import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimein} from '../timein';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-timeinoutfull',
  templateUrl: './timeinoutfull.component.html',
  styleUrls: ['./timeinoutfull.component.css']
})
export class TimeinoutfullComponent implements OnInit {
  p: number = 1;
  timeinDetails: ITimein[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit() {

    $(function() {
      $("#total").html(sumColumn(3));
    });
    
    function sumColumn(index) {
      var total = 0;
      $("td:nth-child(" + index + ")").each(function() {
        total += parseInt($(this).text(), 10) || 0;
      });  
      return total;
    }

    
    this.usersService
    .gettimeinAll()
    .subscribe(
      (data: ITimein[]) => {
        this.timeinDetails = data;
      },);
  }

}
