import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdagricIndItemService {
  constructor(private _http: HttpClient) {}

  addProdagricIndItem(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/prodagric/prodagricIndItem/', data);
  }

  updateProdagricIndItem(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/prodagric/prodagricIndItem/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getProdagricIndItemList(): Observable<any> {
    //return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricIndItem');
    return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricIndItemList');
  }

  deleteProdagricIndItem(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/prodagricIndItem/${id}`);
  }
}