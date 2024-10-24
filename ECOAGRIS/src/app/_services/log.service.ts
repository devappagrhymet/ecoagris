import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  getAllLogs(): Observable<any>{
    return this.http.get<Observable<any>>("http://127.0.0.1:8000/api/gestuser/logs/");
  }

  addLog(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/gestuser/logs/', data);
  }

  updateLog(id: number, data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/gestuser/logs/'+id+'/',data);
  }

  getLogList(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/gestuser/logs');
  }

  deleteLog(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/gestuser/logs/${id}`);
  }
}
