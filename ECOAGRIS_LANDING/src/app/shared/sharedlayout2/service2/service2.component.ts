import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service2',
  templateUrl: './service2.component.html',
  styleUrls: ['./service2.component.scss']
})
export class Service2Component {

  nb_indicateur:number =0;
  nb_sousysteme:number = 0;
  nb_pays:number = 0;
  nb_data_indic:number = 0;

  constructor(
    private _http: HttpClient
) {}

ngOnInit(): void {
  this._getNbrIndicateur();
  this._getSousystemeList();
  this._getNbrDataIndicateur();
  this._getNbrPays()
}

  _getNbrIndicateur()
  {
    this.getNbrIndicateur().subscribe({
      next: (res) => {
        this.nb_indicateur = res["result"];
      // console.log("nbr indic : "+ res);
      },
      error: console.log,
    });
  }

  getNbrIndicateur(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/nbr_indicateur');
  }

  _getNbrDataIndicateur() {
    this.getNbrDataIndicateur().subscribe({
      next: (res) => {
        this.nb_data_indic = res["result"];
      },
      error: console.log,
    });
  }
    
  getNbrDataIndicateur(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/prodagric/nbr_data_indicateur');
  }

  _getSousystemeList() {
    this.getSousystemeList().subscribe({
      next: (res) => {
        this.nb_sousysteme = res["result"];
      },
      error: console.log,
    });
  }

  getSousystemeList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/nbr_sousysteme');
  }

  
  _getNbrPays() {
    this.getNbrPays().subscribe({
      next: (res) => {
        this.nb_pays = res["result"];
      },
      error: console.log,
    });
  }


  getNbrPays(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/nbr_pays');

  }
}
