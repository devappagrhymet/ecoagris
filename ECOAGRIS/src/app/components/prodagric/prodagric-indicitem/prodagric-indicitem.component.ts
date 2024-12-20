import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HeaderComponent } from '../../common/header/header.component';


@Component({
  selector: 'app-prodagric-indicitem',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, 
            MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor,
            MatCardModule, MatTabsModule, MatIconModule, HeaderComponent],
  templateUrl: './prodagric-indicitem.component.html',
  styleUrl: './prodagric-indicitem.component.scss',
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1)',
        'background-color': '#FAFAD2',
        'color':'#000',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
    ])
  ]
})
export class ProdagricIndicitemComponent {

  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);
    
  animationStates: { [key: number]: 'default' | 'active' } = {};

  campagnes!: [];
  pays!: [];
  indicateurs!: [];
 
  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
      public themeService: CustomizerSettingsService
  ) {

    
  }

 

  displayedColumns: string[] = [
    'id',
    'campagne',
    'valeur',
    'unite',
    'indicateur',
    'speculation',
    'divadmin',
    'libDivadmin',
  ];


  dataSource!: MatTableDataSource<any>;

  dataSourceNiveau1!: MatTableDataSource<any>;

  dataSourcePays!: MatTableDataSource<any>;

  params_campagne;
  params_indicateur;
  params_pays;

  @ViewChild(MatPaginator) paginatorPays: MatPaginator;
  @ViewChild(MatSort) sortPays!: MatSort;

  @ViewChild(MatPaginator) paginatorNiveau1: MatPaginator;
  @ViewChild(MatSort) sortNiveau1!: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
    this._getData_Indicator_Niveau_2(2012,12,53);
    this._getData_Indicator_Niveau_1(2012,12,53);
    this._getData_Indicator_Pays(2012,12,53);
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }

      for (let index in this.dataSourceNiveau1) {
        this.animationStates[index] = 'default';
      }

      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }
      /*===================*/
      this._getCampagneList();
      this._getIndicateurBySousysteme(1);
      this._getPaysList();
   }

    /*==========================================*/
    #______________________Campagne________________
    _getCampagneList()
    {
      this.getCampagneList().subscribe(
        res =>{
          this.campagnes = res;
        },
        error => {
          console.log(error);
        }
      )
    }

    getCampagneList(): Observable<any> {
      return this._http.get('http://127.0.0.1:8000/api/parametre/campagnes');
    }
   #______________________pays________________
   _getPaysList()
   {
      this.getPaysList().subscribe(
        res =>{
          this.pays = res;
          //console.log(this.pays);
        },
        error => {
          console.log(error);
        }
      )
   }

   getPaysList(): Observable<any> {
    return this._http.get(' http://127.0.0.1:8000/api/divadmin/pays-list/0');
  }
  #__________________Indicateur_______________________________
   _getIndicateurBySousysteme(id)
   {
     this.getIndicateurList(id).subscribe(
       res =>{
         this.indicateurs = res;
         //console.log(this.sousSystemes);
       },
       error => {
         console.log(error);
       }
     )
   }
   getIndicateurList(id:number): Observable<any> {
     return this._http.get('http://127.0.0.1:8000/api/indicateur/get_indicateur_sousysteme/'+id);
   }
   /*==========================================*/
   
   onChangeCampagne(event){
    this.params_campagne = event.value;
   }

   onChangePays(event){
    this.params_pays = event.value;

   }

   onChangeIndicateur(event){
    this.params_indicateur = event.value;

    this._getData_Indicator_Pays(this.params_campagne,this.params_pays,this.params_indicateur);
    this._getData_Indicator_Niveau_1(this.params_campagne,this.params_pays,this.params_indicateur);
    this._getData_Indicator_Niveau_2(this.params_campagne,this.params_pays,this.params_indicateur);
   }
 
 
  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_campagne,params_pays,params_indicateur) {
    this.getData_Indicator_Pays(params_campagne,params_pays,params_indicateur).subscribe({
      next: (res) => {
    
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(params_campagne,params_pays,params_indicateur): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/get_prodagric/'+params_campagne+'-'+params_pays+'-'+params_indicateur);
  }
  /*========================Data niveau 1========================*/
  _getData_Indicator_Niveau_1(params_campagne,params_pays,params_indicateur) {
    this.getData_Indicator_Niveau_1(params_campagne,params_pays,params_indicateur).subscribe({
      next: (res) => {
    
        this.dataSourceNiveau1 = new MatTableDataSource(res);
        this.dataSourceNiveau1.sort = this.sortNiveau1;
        this.dataSourceNiveau1.paginator = this.paginatorNiveau1;
      },
      error: console.log,
    });
  }

  getData_Indicator_Niveau_1(params_campagne,params_pays,params_indicateur): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/get_prodagric/'+params_campagne+'-'+params_pays+'-'+params_indicateur);
  }
  /*=======================Data Niveau 2=========================*/
  _getData_Indicator_Niveau_2(params_campagne,params_pays,params_indicateur) {
    this.getProdagricIndItemList(params_campagne,params_pays,params_indicateur).subscribe({
      next: (res) => {
    
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getProdagricIndItemList(params_campagne,params_pays,params_indicateur): Observable<any> {
    //return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricIndItem');
    return this._http.get('http://127.0.0.1:8000/api/prodagric/get_prodagric/'+params_campagne+'-'+params_pays+'-'+params_indicateur);
  }
   /*==============================================*/

  _deleteIndicItem(id){
    var result = confirm("Voulez-vous vraiment supprimmer cette variable ?");
    if(id && result)
    {
        this.deleteProdagricIndItem(id).subscribe({
        next: (res) => {
            alert(" Suppression effectué avec success! ");
            this._getData_Indicator_Niveau_2(2012,12,53);
        },
        error: console.log,
        });
    }
  }

  deleteProdagricIndItem(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/prodagric/prodagricIndItem/${id}`);
  }


  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}
