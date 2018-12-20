import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../common/toastr.service'
import { AdminService } from '../admin.service';
import { AuthadminService } from '../authadmin.service';
import { IAdmin } from '../admin';


@Component({
  selector: 'app-aprofile',
  templateUrl: './aprofile.component.html',
  styleUrls: ['./aprofile.component.css']
})
export class AprofileComponent implements OnInit {

  profileForm: FormGroup
  adminObj: any;
  admin: IAdmin;

  constructor(private fb: FormBuilder,
    private authadminService: AuthadminService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) {
  }

  firstname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")]);
  lastname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")]);
  email = new FormControl('', [Validators.email, Validators.pattern(".*\\S.*[a-zA-z]")]);

  ngOnInit() {
    this.adminObj = this.authadminService.currentAdmin;
    this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    });

    this.adminService.getAdmin(this.adminObj.userid).subscribe(data => {
      if (data.success === false) {
        if (data.errcode) {
          this.authadminService.alogout();
          this.router.navigate(['alogin']);
        }
        this.toastr.error(data.message);
      } else {
        this.admin = data.data[0];
        this.populateForm(this.admin);
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

  updateAdmin(formdata: any): void {
    if (this.profileForm.dirty && this.profileForm.valid) {
      this.adminService.updateAdmin(this.adminObj.userid, this.profileForm.value)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.authadminService.alogout();
              this.router.navigate(['alogin']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            let theAdmin: any = JSON.parse(localStorage.getItem('currentAdmin'));
            theAdmin.admin.firstname = this.profileForm.value.firstname;
            theAdmin.admin.lastname = this.profileForm.value.lastname;
            localStorage.setItem('currentAdmin', JSON.stringify(theAdmin));
          }
        });
    }
  }

}

