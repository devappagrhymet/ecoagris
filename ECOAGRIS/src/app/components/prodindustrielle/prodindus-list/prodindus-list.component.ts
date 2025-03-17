import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugNode, ViewChild } from '@angular/core';
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
import { HeaderComponent } from '../../common/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ngxCsv } from 'ngx-csv/ngx-csv';
//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-prodindus-list',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, 
    MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor,
    MatCardModule, MatTabsModule, MatIconModule, HeaderComponent, AsyncPipe, MatProgressSpinnerModule,MatProgressBarModule, DecimalPipe],
  templateUrl: './prodindus-list.component.html',
  styleUrl: './prodindus-list.component.scss',
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
export class ProdindusListComponent {
    
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
    'division',
    'campagne',
    'speculation',
    'categoriespe',
    'quantite',
    'unite'
  ];
  bruteData$: Observable<any[]>;

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  dataSource!: MatTableDataSource<any>;

  dataSourceNiveau1!: MatTableDataSource<any>;

  dataSourcePays!: MatTableDataSource<any>;

  prodagric_data;

  params_campagne;
  

  pays_params
  params_debut = 2019;
  params_fin = 2020;


  params_indicateur = 53;
  
  
  params_pays = 12;
  

  per_page:number;
  current_page:number;
  total_count:number;
  total_pages:number;


  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;

  @ViewChild('matPaginator') matPaginator: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }


   ngOnInit(): void {
      this._getCampagneList();
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }

    
      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }
      /*===================*/
     
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
   onChangePays(event){
     this.pays_params = event.value;
   }
   
  onChangeCampagne(event){
    this.params_debut = event.value;

    this.params_fin  =  this.params_debut + 1;

    this._getData_Indicator_Pays(this.params_debut,this.params_fin,this.pays_params)

  }

  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_debut,params_fin,pays_params) {
  
    this.isLoading.next(true);

    this.getData_Indicator_Pays(params_debut,params_fin,pays_params).subscribe({
      next: (res) => {
    
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
        this.isLoading.next(false);
      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(params_debut,params_fin,pays_params): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/industrielle/get_production_indus/'+params_debut+'-'+params_fin+'-'+pays_params);
  }
    
   
  
   /*==============================================*/



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
    //this.toastr.info('Données production agricole pour  cette campagne existe deja dans la BD', 'INFO');
   //window.print();
   let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
   let tableSelect = document.getElementById('export');
   let tableHtml = tableSelect.outerHTML.replace(/ /g,'%20');
   let downloadLink = document.createElement('a');
   document.body.appendChild(downloadLink);
   downloadLink.href = 'data:' + dataType + ',' + tableHtml;
   downloadLink.download = 'Indicateurs-agricoles-report.xls';
   downloadLink.click();
   document.body.removeChild(downloadLink); 

   /* var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Production agricole - Report',
    useBom: true,
    headers: ["ID", "Campagne", "Valeur", "Unité","Indicateur","Spéculation","Div. Admin.","Libelle Div. Admin."]
  };
   

  let i;
  let export_data = [];

  for(i=0;i < this.prodagric_data.length; i++)
  {
    export_data = this.prodagric_data[i]["id"];
    export_data = this.prodagric_data[i]["campagne"]["annee_debut"];
    export_data = this.prodagric_data[i]["valeur_gen"];
    export_data = this.prodagric_data[i]["indicateur"]["indicateur"];
    export_data = this.prodagric_data[i]["indicateur"]["libelle"];
    export_data = this.prodagric_data[i]["speculation"]["nomSpeculation"];
    export_data = this.prodagric_data[i]["divisionadministrative"]["nomDivision"];
    export_data = this.prodagric_data[i]["divisionadministrative"]["libelleNiveauDivision"];
  }
  new ngxCsv(export_data, "Production agricole - Report", options); */

   //alert("CSV EXPORT")
 }

}
