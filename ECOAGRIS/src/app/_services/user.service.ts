import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any>{
    return this.http.get<Observable<any>>("http://127.0.0.1:8000/api/gestuser/users");
  }

  addUser(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/gestuser/users/', data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/gestuser/users/'+id+'/',data);
  }

  getUserList(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/gestuser/users');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/gestuser/users/${id}`);
  }
}
