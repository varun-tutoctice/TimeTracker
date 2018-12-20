import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../common/toastr.service'
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { IUser } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup
  userObj: any;
  user: IUser;
  
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }

  firstname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")]);
  lastname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")]);
  email = new FormControl('', [Validators.email]);

  ngOnInit(){
    this.userObj =  this.authService.currentUser;
    this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    });

    this.userService.getUser(this.userObj.userid).subscribe(data => {
      if (data.success === false) {
        if (data.errcode){
          this.authService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data.data[0];
        this.populateForm(this.user);
      }
    });
  }

  populateForm(data): void {
    this.profileForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });
  }

  updateUser(formdata:any): void {
    if (this.profileForm.dirty && this.profileForm.valid) {
      this.userService.updateUser(this.userObj.userid, this.profileForm.value)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode){
              this.authService.logout();
              this.router.navigate(['login']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            let theUser:any = JSON.parse(localStorage.getItem('currentUser'));
            theUser.user.firstname = this.profileForm.value.firstname;
            localStorage.setItem('currentUser', JSON.stringify(theUser));
          }
      });
    }
  }

}
