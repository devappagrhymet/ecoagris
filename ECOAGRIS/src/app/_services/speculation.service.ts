import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeculationService {
  constructor(private _http: HttpClient) {}

  addSpeculation(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/prodagric/speculation/', data);
  }

  updateSpeculation(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/prodagric/speculation/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getSpeculationList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/speculation');
  }

  deleteSpeculation(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/speculation/${id}`);
  }
}