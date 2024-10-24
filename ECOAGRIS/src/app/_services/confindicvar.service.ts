import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfIndicVarService {
  constructor(private _http: HttpClient) {}

  addIndicVar(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/indicateurVariable/', data);
  }

  updateIndicVar(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/indicateurVariable/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getIndicVar(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/indicateur/indicateurVariable/');
  }

  deleteIndicVar(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/indicateur/indicateurVariable/${id}`);
  }
}
