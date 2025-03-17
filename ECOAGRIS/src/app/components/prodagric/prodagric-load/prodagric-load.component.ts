import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, interval, map, Observable, startWith } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Console } from 'console';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-prodagric-load',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
             HeaderComponent, AsyncPipe,  MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule,
             MatProgressSpinnerModule, MatProgressBarModule, DecimalPipe],
  templateUrl: './prodagric-load.component.html',
  styleUrl: './prodagric-load.component.scss',
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
export class ProdagricLoadComponent implements OnInit {

  animationStates: { [key: number]: 'default' | 'active' } = {};
    
  generateurForm: FormGroup;
  variableItemForm: FormGroup;
  indIicateurItemForm: FormGroup;

  variableForm: FormGroup;
  indicVarForm: FormGroup;

  varQuantiteProd;
  varSuperficieCult;
  indRendement;
  
  sousSystemes!: [];

  variables!: [];

  systeme:number;

  selectedValue;

  indicValue;
  campagne_params;
  pays_params;
  debut_campagne;
  fin_campagne;

  myControl = new FormControl('');
  options: string[] = ['2000', '2001', '2002','2003', '2004', '2005','2006', '2007', '2008','2009', '2010', '2011',
                       '2012', '2013', '2014','2015', '2016', '2017','2018', '2019', '2020','2021', '2022', '2023','2024'];
  filteredOptions: Observable<string[]>;
  
  private source = interval(3000);

  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
      private _fb:FormBuilder,
      private toastr: ToastrService
  ) {
    this.generateurForm = this._fb.group({
      pays: '',
      debut_campagne: '',
      fin_campagne: ''

    });
     /////////////////////Formulaire variable////////////////
     this.variableItemForm = this._fb.group({
        produit: '',
        categorie:'',
        superficie_prod_agricole: '',
        unite_1:'',
        rendement_prod_agricole:'',
        unite_2:'',
        quantite_prod_agricole:'',
        unite_3:'',
        debut_campagne:'',
        fin_campagne:'',
        divisionadministrative:'',
        pays_id:''
    });
    /////////////////////Formulaire indicateur////////////////
    this.indIicateurItemForm = this._fb.group({
      debut_campagne: '',
      fin_campagne:'',
      speculation: '',
      indicateur: '',
      divisionadministrative: '',
      pays_id:'',
      valeur_gen: '',
      valid_pfr:'',
      valid_pfp:'',
      public:''
    });
  }
  
  
  displayedColumns: string[] = [
    'id',
    'divadmin',
    'campagne',
    'speculation',
    'categorie',
    'superficie',
    'unite_1',
    'rendement',
    'unite_2',
    'production',
    'unite_3'
    
  ];

  /************************************** */
  prodagricIndItemForm: FormGroup;
 
  pays;

  campagnes!: [];
  speculations!: [];
  indicateurs!: [];

  productionData!: [];

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  /************************************** */
  dataSourcePays!: MatTableDataSource<any>;

  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;


  affichage:Boolean;

  /***************************** */

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
      this._getPaysList();

      this.affichage = false;

      
      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }
    
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
   }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

   /*==========================================*/
   #______________________pays________________
   _getPaysList()
   {
      this.getPaysList().subscribe(
        res =>{
          this.pays = res;
        },
        error => {
          console.log(error);
        }
      )
   }
   getPaysList(): Observable<any> {
      return this._http.get('http://154.127.90.218:8000/api/divadmin/pays-list/0');
    }
   /*==========================================*/


 

   #____________________________
  loadProdagricData()
  {
      this._loadProdagricData().subscribe(
        spec =>{

            let productionData = spec["data"];
            let status = spec["status"];
            let message = spec["message"];
            let nbrExistData = spec["nbrExistData"];

            //console.log("status & existe data : "+status+"  "+nbrExistData);

            let i;

            let limit:number = productionData.length;

            if(status === 200 && nbrExistData == 0)
            {
              
              for(i=0;i<productionData.length;i++)
              { 
                this.isLoading.next(true);
                //=========================================================================/
                this.variableItemForm.patchValue({
                      produit: productionData[i]["id_produit"],
                      categorie: productionData[i]["categorie_id"],
                      superficie_prod_agricole: productionData[i]["superficie_production_agricole"],
                      unite_1: 'ha',
                      rendement_prod_agricole: productionData[i]["rendement_production_agricole"],
                      unite_2: 'kg/ha',
                      quantite_prod_agricole: productionData[i]["quantite_production_agricole"],
                      unite_3:'Tonne',
                      debut_campagne:productionData[i]["debut_campagne"],
                      fin_campagne:productionData[i]["fin_campagne"],
                      divisionadministrative:productionData[i]["id_division_administrative"],
                      pays_id:productionData[i]["pays_production_agricole"]
                });
                this._addProdagricVarItem(this.variableItemForm.value).subscribe();

              
              }
              
             
              this.setTimeOut();

            }
            else if(status === 200 && nbrExistData > 0)
            {
              
              this.toastr.info('Données production agricole pour  cette campagne existe deja dans la BD', 'INFO');
            }
            else
            {
             
              this.toastr.warning('Données production agricole non disponible à la source pour cette campagne', 'NOTIFICATION');
            }
        },
        error => {
          console.log(error);
        }
      );
  }
   
  _loadProdagricData(): Observable<any> {
      
      let annee_debut = this.debut_campagne;
      let annee_fin = this.fin_campagne;
      let pays = this.pays_params;

      //console.log('Debut '+annee_debut+' Fin '+annee_fin+' Pays '+pays);

      let url;
      if(annee_debut && annee_fin && pays){
          url = this._http.get('http://154.127.90.218:8000/api/prodagric/getDataProductionAgricole?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays);
        }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }

   
   _addProdagricVarItem(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricVarItem/',data);

    //return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricVarItemList/',data);
   }

  _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricIndItem/',data);
  }

  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays(this.debut_campagne,this.fin_campagne,this.pays_params);
      this.isLoading.next(false);
       this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },45000);
  }

   /*========================Data niveau PAYS======================*/
   _getData_Indicator_Pays(params_debut,params_fin,params_pays) {

      this.getData_Indicator_Pays(params_debut,params_fin,params_pays).subscribe({
        next: (res) => {
          this.dataSourcePays = new MatTableDataSource(res);
          this.dataSourcePays.sort = this.sortPays;
          this.dataSourcePays.paginator = this.paginatorPays;
          this.affichage = true;
        },
        error: console.log,
      });
  }

  getData_Indicator_Pays(params_debut,params_fin,params_pays): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/prodagric/get_prodagric_data/'+params_debut+'-'+params_fin+'-'+params_pays);
  }


}
