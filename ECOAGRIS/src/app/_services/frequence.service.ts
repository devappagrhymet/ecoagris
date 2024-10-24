import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrequenceService {
  constructor(private _http: HttpClient) {}

  addFrequence(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/frequences/', data);
  }

  updateFrequence(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/frequences/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getFrequenceList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/frequences');
  }

  deleteFrequence(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/parametre/frequences/${id}`);
  }
}
