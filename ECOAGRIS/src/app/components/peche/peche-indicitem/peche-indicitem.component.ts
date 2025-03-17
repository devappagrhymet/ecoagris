import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-peche-indicitem',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, 
            MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor,
            MatCardModule, MatTabsModule, MatIconModule, HeaderComponent, AsyncPipe, MatProgressSpinnerModule,MatProgressBarModule,
            DecimalPipe],
  templateUrl: './peche-indicitem.component.html',
  styleUrl: './peche-indicitem.component.scss',
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
export class PecheIndicitemComponent {
    
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
      public themeService: CustomizerSettingsService,
      private toastr: ToastrService
  ) {

    
  }

 

  displayedColumns: string[] = [
    'id',
    'divadmin',
    'libDivadmin',
    'campagne',
    'donnee',
    'type',
    'valeur',
    'unite'
  ];


  bruteData$: Observable<any[]>;

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  dataSource!: MatTableDataSource<any>;

  dataSourcePays!: MatTableDataSource<any>;

  params_campagne;

  params_debut;
  params_fin;
  params_indicateur;
  params_pays;
  

  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;

  @ViewChild('matPaginator') matPaginator: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  /******************************** */

  

  ngAfterViewInit() {
   
  }


   ngOnInit(): void {

    //this._getData_Indicator_Niveau_2(2020,2021,12,82);
   
    //this._getData_Indicator_Pays(2020,2021,12,82);
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }

      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }
      /*===================*/
      this._getCampagneList();
      this._getIndicateurBySousysteme(3);
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
      return this._http.get('http://154.127.90.218:8000/api/parametre/campagnes');
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
    return this._http.get(' http://154.127.90.218:8000/api/divadmin/pays-list/0');
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
     return this._http.get('http://154.127.90.218:8000/api/indicateur/get_indicateur_sousysteme/'+id);
   }
   /*==========================================*/
   
   onChangeCampagne(event){
    this.params_campagne = event.value;

    this.params_debut = this.params_campagne;

    this.params_fin  =  this.params_campagne + 1;
   }

   onChangePays(event){
    this.params_pays = event.value;

   }

   onChangeIndicateur(event){
    this.params_indicateur = event.value;

    this._getData_Indicator_Pays(this.params_debut,this.params_fin,this.params_pays,this.params_indicateur);
    this._getData_Indicator_Niveau_2(this.params_debut,this.params_fin,this.params_pays,this.params_indicateur);
   }
 
 
  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur) {
    
    this.isLoading.next(true);

    this.getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur).subscribe({
      next: (res) => {
    
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
        this.isLoading.next(false);
      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/peche/get_peche_pays/'+params_debut+'-'+params_fin+'-'+params_pays+'-'+params_indicateur);
  }
  
  /*=======================Data Niveau 2=========================*/
  _getData_Indicator_Niveau_2(params_debut,params_fin,params_pays,params_indicateur) {

    this.isLoading.next(true);

    this.getProdagricIndItemList(params_debut,params_fin,params_pays,params_indicateur).subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.matPaginator;
        this.isLoading.next(false);

      },
      error: console.log,
    });
  }

  getProdagricIndItemList(params_debut,params_fin,params_pays,params_indicateur): Observable<any> {
  
    return this._http.get('http://154.127.90.218:8000/api/peche/get_peche_pays/'+params_debut+'-'+params_fin+'-'+params_pays+'-'+params_indicateur);

  }
   /*==============================================*/

  _deleteIndicItem(id){
    var result = confirm("Voulez-vous vraiment supprimmer cette variable ?");
    if(id && result)
    {
        this.deleteProdagricIndItem(id).subscribe({
        next: (res) => {
            alert(" Suppression effectué avec success! ");
            this._getData_Indicator_Niveau_2(2014,2015,12,82);
        },
        error: console.log,
        });
    }
  }

  deleteProdagricIndItem(id: number): Observable<any> {
    return this._http.delete(`http://154.127.90.218:8000/api/prodagric/prodagricIndItem/${id}`);
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


  /*===================================*/
  printReport(): void{
     
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('export');
    let tableHtml = tableSelect.outerHTML.replace(/ /g,'%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ',' + tableHtml;
    downloadLink.download = 'Indicateurs-peche-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink); 
  }

}
