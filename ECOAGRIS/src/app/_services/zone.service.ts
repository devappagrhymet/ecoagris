import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private _http: HttpClient) {}

  addZone(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/divadmin/zones/', data);
  }

  updateZone(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/divadmin/zones/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getZoneList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/divadmin/zones');
  }

  deleteZone(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/divadmin/zones/${id}`);
  }
}
