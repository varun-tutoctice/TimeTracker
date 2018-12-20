import { Component, OnInit } from '@angular/core';
import { AuthadminService } from '../authadmin.service';
import { ToastrService } from '../../common/toastr.service';
import { UsersService } from '../users.service';
import { IEmployee } from '../employee';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {
  p: number = 1;
  foundUsers: IEmployee[];

  constructor(private authadminService: AuthadminService,
    private usersService: UsersService,
    private toastr: ToastrService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.usersService
    .getUsers()
    .subscribe(
      (data: IEmployee[]) => {this.foundUsers = data}
    );
}

onSelect(selectedUser: any) {
  console.log(selectedUser._id); 
  this.router.navigate(['/dashboard/userdetail/',selectedUser._id]);
}

}
