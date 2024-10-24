import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BassinService {
  constructor(private _http: HttpClient) {}

  addBassin(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/divadmin/bassins/', data);
  }

  updateBassin(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/divadmin/bassins/'+id+'/',data);
  }

  getBassinList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/divadmin/bassins');
  }

  deleteBassin(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/divadmin/bassins/${id}`);
  }
}
