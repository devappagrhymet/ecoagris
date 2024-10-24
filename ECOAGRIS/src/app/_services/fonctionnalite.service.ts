import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FonctionnaliteService {
  constructor(private http: HttpClient) {}

  getAllFcts(): Observable<any>{
    return this.http.get<Observable<any>>("http://127.0.0.1:8000/api/gestuser/fonctionnalites/");
  }

  addFct(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/gestuser/fonctionnalites/', data);
  }

  updateFct(id: number, data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/gestuser/fonctionnalites/'+id+'/',data);
  }

  getFctList(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/gestuser/fonctionnalites');
  }

  deleteFct(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/gestuser/fonctionnalites/${id}`);
  }
}
