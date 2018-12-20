import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../common/toastr.service';
import { AuthadminService } from '../../admin-dashboard/authadmin.service';

@Component({
  selector: 'app-alogin',
  templateUrl: './alogin.component.html',
  styleUrls: ['./alogin.component.css']
})
export class AloginComponent {

  constructor(private fb: FormBuilder, 
    private authadminService: AuthadminService,
    private router: Router,
    private toastr: ToastrService) {
  }

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    email: this.email,
    password: this.password,
  });


  loginAdmin(formdata:any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authadminService.alogin(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toastr.error(data.json().message);
          } else {
            this.toastr.success('Login successful.');
            this.router.navigate(['/dashboard']);
          }
          this.loginForm.reset();
        });
    }
  }
  
}
