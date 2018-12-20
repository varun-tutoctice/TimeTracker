import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../common/toastr.service';
import { UserService } from '../../emp-dashboard/user.service';


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
  selector: 'app-esignup',
  templateUrl: './esignup.component.html',
  styleUrls: ['./esignup.component.css']
})
export class EsignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }

  firstname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")] );
  lastname = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")]);
  email = new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){3,}@[a][u][r][o][t][e][c][h][c][o][r][p]\.com$")]);
  // username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#\$%\^&\*])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required]);
  

  ngOnInit(): void {
      this.registerForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      // username: this.username,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, {validator: comparePassword})
    });
  }

  registerUser(formdata:any): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      let theForm = this.registerForm.value;
      const thePass = this.registerForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/auth/elogin']);
          }
          this.registerForm.reset();
      });
    }
  }
}

