import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SousSystemeService {
  constructor(private _http: HttpClient) {}

  addSousysteme(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/sous_systemes/', data);
  }

  updateSousysteme(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getSousystemeList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/sous_systemes');
  }

  deleteSousysteme(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/parametre/sous_systemes/${id}`);
  }
}
