import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IndicateurService } from '../../../../_services/indicateur.service';
import { SousSystemeService } from '../../../../_services/sous-systeme.service';
import { UserService } from '../../../../_services/user.service';
import { IndicatorService } from '../../../../_services/indicator.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hd-stats',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, HttpClientModule],
    templateUrl: './hd-stats.component.html',
    styleUrls: ['./hd-stats.component.scss']
})





export class HdStatsComponent {
    nb_indicateur:number =0;
    nb_sousysteme:number = 0;
    nb_pays:number = 0;
    nb_data_indic:number = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private _http: HttpClient
    ) {}

    ngOnInit(): void {
      this._getNbrIndicateur();
      this._getSousystemeList();
      this._getNbrDataIndicateur();
      this._getNbrPays()
    }

    toggleTheme() {
        this.themeService.toggleTheme();
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