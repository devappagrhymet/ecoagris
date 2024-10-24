import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampagneService {
  constructor(private _http: HttpClient) {}

  addCampagne(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/campagnes/', data);
  }

  updateCampagne(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/campagnes/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getCampagneList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/campagnes');
  }

  deleteCampagne(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/parametre/campagnes/${id}`);
  }
}
