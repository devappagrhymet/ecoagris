import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {
  private protocol = 'http'; // Replace with your protocol
  private baseUrl = '172.0.0.1'; // Replace with your base URL
  private port = '8000'; // Replace with your port number
  private apiPrefix = 'api/'; // Replace with your API prefix

  constructor(private http: HttpClient) {}

  public indicateurList(request: any){
    const apiUrl = `${this.protocol}://${this.baseUrl}:${this.port}/${this.apiPrefix}indicateur/indicateurList`;
    const urlWithParams = new URL(apiUrl);

    const params = {
      offset: request?.filter?.pageNumber,
      size: request?.filter?.rowsPerPage,
      sortBy: request?.filter?.sortingField,
      asc: request?.filter?.asc,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        urlWithParams.searchParams.append(key, String(value));
      }
    });

    if (request?.filter?.search) {
      const searchValue = request.filter.search;
      urlWithParams.search += (urlWithParams.search ? '&' : '') + `search=${searchValue}`;
    }

    return this.http
      .get<any>(urlWithParams.toString())
      .pipe(
        map((response) => response),
        catchError((error) => {
          if (error.status === 404) {
            return of({ data: [] });
          } else {
            throw error;
          }
        })
      );
  }
}
