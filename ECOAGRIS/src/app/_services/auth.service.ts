import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("I am server :  tentative de conection : "+username+" |  "+password);

    return this.http.get("http://127.0.0.1:8000/api/gestuser/getuser/"+username+'-'+password+"/");
    /* return this.http.post(
      "http://127.0.0.1:8000/api/gestuser/getuser/" + 'signin',
      {
        username,
        password,
      },
      httpOptions
    ); */
    /* return this.http.get(
      "http://127.0.0.1:8000/api/gestuser/getuser/"+username+'-'+password+"/",httpOptions
    ); */
  }

  /* login(data) : Observable<any>{
    console.log("I am server :  tentative de conection");

    return this.http.post('http://172.16.32.93:3000/login',data);
  } */




  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
