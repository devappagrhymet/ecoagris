import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicateurService {
  constructor(private _http: HttpClient) {}

  addIndicateur(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/indicateur/', data);
  }

  updateIndicateur(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/indicateur/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getIndicateurList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/indicateur/indicateurList/');
  }

  deleteIndicateur(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/indicateur/indicateur/${id}`);
  }
 

  updateFormuleIndicateur(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/config_formule/'+id+'/',data);
  }
}
