import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdagricGenerateurService {
  constructor(private _http: HttpClient) {}

  varQuantiteProd(campagne:number, speculation:number, pays:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  varSuperficieCult(campagne:number, speculation:number, pays:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  indRendement(quantite:number, superficie:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/indRendement?quantite='+quantite+'&superficie='+superficie);
  }


  /* deleteSpeculation(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/speculation/${id}`);
  } */
}