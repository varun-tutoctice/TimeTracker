import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

import { AuthadminService } from './authadmin.service';
import { ToastrService } from '../common/toastr.service';

@Injectable()
export  class AuthadminGuard implements CanActivate {

    constructor(private authadminService: AuthadminService,
                private router: Router,
                private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAloggedIn(state.url);
    }

    checkAloggedIn(url: string): boolean {
        if (this.authadminService.isAloggedIn()) {
            return true;
        }

        this.toastr.info("Please login to access this page.")
        this.router.navigate(['/auth/alogin']);
        return false;
    }
}
