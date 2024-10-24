import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdagricVarItemService {
  constructor(private _http: HttpClient) {}

  addProdagricVarItem(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/prodagric/prodagricVarItem/', data);
  }

  updateProdagricVarItem(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/prodagric/prodagricVarItem/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getVarItemList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricVarItemList/');
  }

  deleteProdagricVarItem(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/prodagricVarItem/${id}`);
  }
}