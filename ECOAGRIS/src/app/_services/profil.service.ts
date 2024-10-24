import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  constructor(private http: HttpClient) {}

  getAllProfils(): Observable<any>{
    return this.http.get<Observable<any>>("http://127.0.0.1:8000/api/gestuser/profils/");
  }

  addProfil(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/gestuser/profils/', data);
  }

  updateProfil(id: number, data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/gestuser/profils/'+id+'/',data);
  }

  getProfilList(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/gestuser/profils');
  }

  deleteProfil(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/gestuser/profils/${id}`);
  }
}
