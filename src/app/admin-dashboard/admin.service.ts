import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminService {
    
    public jwtToken: string;

    constructor(private http: Http) {
        const theAdmin:any = JSON.parse(localStorage.getItem('currentAdmin'));
        if (theAdmin) {
            this.jwtToken = theAdmin.token;
        }
    }
    
    register(oAdmin) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('http://localhost:3000/adminregister', JSON.stringify(oAdmin), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getAdmin(adminid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`http://localhost:3000/api/admin/${adminid}`, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateAdmin(adminid, oAdmin){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`http://localhost:3000/api/admin/${adminid}`, JSON.stringify(oAdmin), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateAPassword(adminid, oAdmin){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.jwtToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`http://localhost:3000/api/adminpassword/${adminid}`, JSON.stringify(oAdmin), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
