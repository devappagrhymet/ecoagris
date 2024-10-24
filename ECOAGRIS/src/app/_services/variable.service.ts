import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VariableService {
  constructor(private _http: HttpClient) {}

  addVariable(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/variable/', data);
  }

  updateVariable(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/variable/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getVariableList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/indicateur/variableList');
  }

  deleteVariable(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/indicateur/variable/${id}`);
  }
}
