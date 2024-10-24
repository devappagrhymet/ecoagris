import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NiveauService {
  constructor(private _http: HttpClient) {}

  addNiveau(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/niveaux/', data);
  }

  updateNiveau(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/niveaux/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getNiveauList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/niveaux');
  }

  deleteNiveau(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/parametre/niveaux/${id}`);
  }
}
