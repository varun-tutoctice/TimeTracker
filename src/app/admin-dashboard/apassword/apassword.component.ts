import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../common/toastr.service'
import { AdminService } from '../admin.service';
import { AuthadminService } from '../authadmin.service';


function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
      return null;
  }
  return { 'mismatchedPassword': true };
}


@Component({
  selector: 'app-apassword',
  templateUrl: './apassword.component.html',
  styleUrls: ['./apassword.component.css']
})
export class ApasswordComponent implements OnInit {

  passwordForm: FormGroup;
  adminObj: any;

  constructor(private fb: FormBuilder, 
    private authadminService: AuthadminService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) {
  }
  
  oldpassword = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required,  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#\$%\^&\*])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required]);

  ngOnInit(){
    this.adminObj =  this.authadminService.currentAdmin;
    this.passwordForm = this.fb.group({
      oldpassword: this.oldpassword,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, {validator: comparePassword})
    });
  }

  updateApassword(formdata:any): void {
    if (this.passwordForm.dirty && this.passwordForm.valid) {
      let theForm = this.passwordForm.value;
      const thePass = this.passwordForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.adminService.updateAPassword(this.adminObj.userid,theForm)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode){
              this.authadminService.alogout();
              this.router.navigate(['alogin']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
          }
          this.passwordForm.reset();
      });
    }
  }
  
}
