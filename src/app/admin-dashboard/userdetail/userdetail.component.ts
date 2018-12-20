import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { ITimein} from '../timein';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  p: number = 1;
  userDetails: ITimein[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    // this.usersService
    // .gettimeinAll()
    // .subscribe(
    //   (data: ITimein[]) => {
    //     this.userDetails = data;
    //   },);


    
    this.route.paramMap
    .switchMap((params: ParamMap) => this.usersService.getUserid(params.get('userid')))
    .subscribe((data: ITimein[]) => this.userDetails =data); 
  }
  back() {
    this.router.navigate(['/dashboard/ausers']);
  }
  printScreen() {
    window.print();
  }
}
