import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { IAdmin } from './admin';

@Injectable()
export class AuthadminService {
    
    public currentAdmin: IAdmin;
    
    constructor(private http: Http) {}

    isAloggedIn(): boolean {
        try {
            const theAdmin:any = JSON.parse(localStorage.getItem('currentAdmin'));
            if (theAdmin) {
                this.currentAdmin = theAdmin.admin;
            }
        } catch (e) {
            return false;
        }
        
        return !!this.currentAdmin;
    }

    alogin(oAdmin) {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('http://localhost:3000/api/adminlogin', JSON.stringify(oAdmin), options)
        .do((response: Response) => {
            if (response.json().success) {
                this.currentAdmin = <IAdmin>response.json().message;
                let adminObj: any = {};
                adminObj.admin = response.json().message;
                adminObj.token = response.json().token;

                localStorage.setItem('currentAdmin', JSON.stringify(adminObj));
            }
            response.json();
        })
        .catch(this.handleError);
    }

    alogout(): void {
        this.currentAdmin = null;
        localStorage.removeItem('currentAdmin');
    }

     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
