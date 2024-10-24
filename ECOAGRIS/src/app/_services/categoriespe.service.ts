import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriespeService {
  constructor(private _http: HttpClient) {}

  addCategoriespe(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/prodagric/categoriespe/', data);
  }

  updateCategoriespe(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/prodagric/categoriespe/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  getCategoriespeList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/categoriespe');
  }

  deleteCategoriespe(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/categoriespe/${id}`);
  }
}