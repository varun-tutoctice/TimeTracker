import { Component } from '@angular/core';
import { AuthService } from './emp-dashboard/auth.service';
import { AuthadminService } from './admin-dashboard/authadmin.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, public authadminService: AuthadminService){}
  title = 'aurotech-time';
}
