import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniteService {
  constructor(private _http: HttpClient) {}

  addUnite(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/unites/', data);
  }

  updateUnite(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/unites/'+id+'/',data);

  }

  getUniteList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/unites');
  }

  deleteUnite(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/parametre/unites/${id}`);
  }
}
