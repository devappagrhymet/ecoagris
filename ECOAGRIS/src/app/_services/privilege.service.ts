import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PrivilegeService {
  constructor(private http: HttpClient) {}

  getPrivilegeLogs(): Observable<any>{
    return this.http.get<Observable<any>>("http://127.0.0.1:8000/api/gestuser/privileges/");
  }

  addPrivilege(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/gestuser/privileges/', data);
  }

  updatePrivilege(id: number, data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/gestuser/privileges/'+id+'/',data);
  }

  getPrivilegeList(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/gestuser/privileges');
  }

  deletePrivilege(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/gestuser/privileges/${id}`);
  }
}
