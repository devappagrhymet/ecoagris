import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-agricole-indic-cal',
  standalone: true,
  imports: [ MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
     HeaderComponent, AsyncPipe, NgFor, MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule, 
     MatProgressSpinnerModule, MatProgressBarModule, DecimalPipe],
  templateUrl: './agricole-indic-cal.component.html',
  styleUrl: './agricole-indic-cal.component.scss',
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
export class AgricoleIndicCalComponent {
    
  generateurForm: FormGroup;
  variableItemForm: FormGroup;
  indIicateurItemForm: FormGroup;

  variableForm: FormGroup;
  indicVarForm: FormGroup;

  varQuantiteProd;
  varSuperficieCult;
  indRendement;
  
  animationStates: { [key: number]: 'default' | 'active' } = {};

  sousSystemes!: [];

  variables!: [];

  systeme:number;

  selectedValue;

  indicValue;
  campagne_params;
  pays_params;
  debut_campagne;
  fin_campagne;
  indicateur_params;

  myControl = new FormControl('');
  options: string[] = ['2000', '2001', '2002','2003', '2004', '2005','2006', '2007', '2008','2009', '2010', '2011',
                       '2012', '2013', '2014','2015', '2016', '2017','2018', '2019', '2020','2021', '2022', '2023','2024','2025'];
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
      fin_campagne: '',
      indicateur:''

    });
     /////////////////////Formulaire variable////////////////
     this.variableItemForm = this._fb.group({
        valeur : '',
        mois : '',
        annee: '',
        speculation : '',
        variable : '',
        nom_marche : '',
        type_prix : '',
        code_unite : '',
        code_devise : '',
        divisionadministrative : '',
        niveau1_id : '',
        pays_id: '',
    });
    /////////////////////Formulaire indicateur////////////////
    this.indIicateurItemForm = this._fb.group({
        valeur_gen: '',
        mois: '',
        annee:'',
        speculation: '',
        indicateur: '',
        code_devise: '',
        divisionadministrative: '',
        niveau1_id: '',
        pays_id: '',
        valid_pfr : '',
        valid_pfp : '',
        public : '',
    });
  }

  
  displayedColumns: string[] = [
    'id',
    'divadmin',
    'libDivadmin',
    'annee',
    'speculation',
    'categorie',
    'prix',
    'devise',
  ];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
      this._getPaysList();
    
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.affichage = false;

      /*===================*/
      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }
      /*===================*/
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
  loadComextData()
  {
      switch (this.indicateur_params)
      { 
        /*----------------06R001 - Prix au consommateur des produits agricoles---------*/
        case  73:
          this._loadMarcheAgricoleData().subscribe(
            spec =>{
    
                let productionData = spec["result"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];
    
                //console.log("status & existe data : "+status+"  "+nbrExistData);
                let i;
    
                if(status === 200)
                { 
                  //for(i=0;i<5;i++)
                  for(i=0;i<productionData.length;i++)
                  { 
                    this.isLoading.next(true);
                    //______________________Indicateur_________________________
                    this.indIicateurItemForm.patchValue({
                      valeur_gen:              productionData[i]["prix"],
                      mois:                    1,
                      annee:                   productionData[i]["annee"],
                      speculation:             productionData[i]["speculation"],
                      indicateur:              73,
                      code_devise:             productionData[i]["code_devise"],
                      divisionadministrative:  productionData[i]["pays_id"],
                      niveau1_id:              productionData[i]["pays_id"],
                      pays_id:                 productionData[i]["pays_id"],
                      valid_pfr :              false,
                      valid_pfp :              false,
                      public :                 true
                    });

                    //console.log(this.indIicateurItemForm.value);
                    this._addMarcheAgricoleIndItem(this.indIicateurItemForm.value).subscribe();
                    //______________________________________________
                 
                  }
                  this.setTimeOut();
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
          
          break;
        /*----------------06R002 - Prix demi-gros des produits agricoles---------*/
        case  74:
          this._loadMarcheAgricoleData().subscribe(
            spec =>{
    
              let productionData = spec["result"];
              let status = spec["status"];
              let message = spec["message"];
              let nbrExistData = spec["nbrExistData"];
    
                //console.log("status & existe data : "+status+"  "+nbrExistData);
                let i;
    
                if(status === 200)
                { 
                  
                  //for(i=0;i<5;i++)
                  for(i=0;i<productionData.length;i++)
                  { 
                    this.isLoading.next(true);
                     //______________________Indicateur_________________________
                     this.indIicateurItemForm.patchValue({
                      valeur_gen:              productionData[i]["prix"],
                      mois:                    1,
                      annee:                   productionData[i]["annee"],
                      speculation:             productionData[i]["speculation"],
                      indicateur:              74,
                      code_devise:             productionData[i]["code_devise"],
                      divisionadministrative:  productionData[i]["pays_id"],
                      niveau1_id:              productionData[i]["pays_id"],
                      pays_id:                 productionData[i]["pays_id"],
                      valid_pfr :              false,
                      valid_pfp :              false,
                      public :                 true
                    });

                    //console.log(this.indIicateurItemForm.value);
                    this._addMarcheAgricoleIndItem(this.indIicateurItemForm.value).subscribe();
                    //______________________________________________
                  }
                  this.setTimeOut();
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
          
          break;
        /*----------------06R002-bis - Prix gros des produits agricoles---------*/
        case  75:
          this._loadMarcheAgricoleData().subscribe(
            spec =>{
    
                let productionData = spec["result"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];
    
                //console.log("status & existe data : "+status+"  "+nbrExistData);
                let i;
    
                if(status === 200)
                { 
                  
                  //for(i=0;i<5;i++)
                  for(i=0;i<productionData.length;i++)
                  { 
                    this.isLoading.next(true);
                     //______________________Indicateur_________________________
                     this.indIicateurItemForm.patchValue({
                      valeur_gen:              productionData[i]["prix"],
                      mois:                    1,
                      annee:                   productionData[i]["annee"],
                      speculation:             productionData[i]["speculation"],
                      indicateur:              75,
                      code_devise:             productionData[i]["code_devise"],
                      divisionadministrative:  productionData[i]["pays_id"],
                      niveau1_id:              productionData[i]["pays_id"],
                      pays_id:                 productionData[i]["pays_id"],
                      valid_pfr :              false,
                      valid_pfp :              false,
                      public :                 true
                    });

                    console.log(this.indIicateurItemForm.value);
                    this._addMarcheAgricoleIndItem(this.indIicateurItemForm.value).subscribe();
                    //______________________________________________
                 
                  }
                  this.setTimeOut();
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
          
          break;
        /*-----------------------------*/
        default:
          break;
      }
     
   }
   
  _loadMarcheAgricoleData(): Observable<any> {
      let annee = this.debut_campagne;
      let variable;
      let pays = this.pays_params;

      switch (this.indicateur_params)
      { 
        case  73:
            variable = 3;
          break;
        case  74:
            variable = 13;
          break;

        case  75:
             variable = 14;
          break;

        default:
          break;
      }
    

      let url;
      if(annee && pays){
      
        url = this._http.get('http://154.127.90.218:8000/api/marche/marche_prix_consommateur?params_annee='+annee+'&params_pays='+pays+'&params_variable='+variable);
        //url = this._http.get('http://154.127.90.218:8000/api/marche/prix_produit_agricole?annee='+annee+'&pays='+pays+'&type='+type)
        
      }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }

  _addMarcheAgricoleVarItem(data: any): Observable<any> {

    return this._http.post('http://154.127.90.218:8000/api/marche/marchAgricVarItem/',data);
   
  }

  _addMarcheAgricoleIndItem(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/marche/marchAgricIndItem/',data);
  }


  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays(this.debut_campagne,this.pays_params,this.indicateur_params);
      this.isLoading.next(false);
       this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },10000);
  }

   /*========================Data niveau PAYS======================*/
   _getData_Indicator_Pays(params_debut,params_pays,params_indicateur) {

      this.getData_Indicator_Pays(params_debut,params_pays,params_indicateur).subscribe({
        next: (res) => {
          this.dataSourcePays = new MatTableDataSource(res);
          this.dataSourcePays.sort = this.sortPays;
          this.dataSourcePays.paginator = this.paginatorPays;
          this.affichage = true;
        },
        error: console.log,
      });
  }

  getData_Indicator_Pays(params_debut,params_pays,params_indicateur): Observable<any> {

    return this._http.get('http://154.127.90.218:8000/api/marche/get_indicateur_agricole/'+params_debut+'-'+params_pays+'-'+params_indicateur)
 
  }

   /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

  


}
