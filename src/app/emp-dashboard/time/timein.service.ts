import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from '../../common/toastr.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Body } from '../../../../node_modules/@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class TimeinService {
  public jwtToken: string;

  constructor(private http: Http, private toastr: ToastrService) {
      const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
          this.jwtToken = theUser.token;
      }
  }
  
  saveTimein(userid, oTimein){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:3000/api/timein/${userid}`, JSON.stringify(oTimein), options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

  saveTimeout(userid, oTimeout){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/timeout/${userid}`, JSON.stringify(oTimeout), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  gettimeinDate(userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:3000/api/timeindate/${userid}`, options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
}


  private handleError(error: Response) {
    console.error(error);
    // this.toastr.error(Body.error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
