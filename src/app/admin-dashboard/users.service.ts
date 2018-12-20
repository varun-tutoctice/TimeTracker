import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    
  public jwtToken: string;

  constructor(private http: Http) {
      const theAdmin:any = JSON.parse(localStorage.getItem('currentAdmin'));
      if (theAdmin) {
          this.jwtToken = theAdmin.token;
      }
  }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:3000/api/users`, options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
}
  getUserid(userid) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timein/${userid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


gettimein() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timein`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}
gettimeinAll() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeinall`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}


gettimeinAlllimit() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeinalllimit`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}

gettimeout() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeout`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}
gettimeincount(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeinccount`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}

gettimeoutcount(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeoutccount`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}

gettimeincurrent(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeincurrent`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}

gettimeoutcurrent(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/timeoutcurrent`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}
getusercount(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  let options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:3000/api/usercount`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
}




private handleError(error: Response) {
  console.error(error);
  return Observable.throw(error.json().error || 'Server error');
}
}
