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
  selector: 'app-betail-indic-cal',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
     HeaderComponent, AsyncPipe, NgFor, MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule, 
     MatProgressSpinnerModule, MatProgressBarModule, DecimalPipe],
  templateUrl: './betail-indic-cal.component.html',
  styleUrl: './betail-indic-cal.component.scss',
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
export class BetailIndicCalComponent {
    
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
        espece: '',
        divisionadministrative: '',
        niveau1_id: '',
        pays_id: '',
        valid_pfr : '',
        valid_pfp : '',
        public : '',
    });
  }

  // displayedColumns: string[] = [
  //   'id',
  //   'code_ind',
  //   'indicateur',
  //   'code_var',
  //   'variable',
  //   'action'
  // ];


  displayedColumns: string[] = [
    'pays',
    'divadmin',
    'annee',
    'speculation',
    'race',
    'prix',
    'devise'
  ];


  dataSourcePays!: MatTableDataSource<any>;

  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;

  /************************************** */
  prodagricIndItemForm: FormGroup;
 
  pays;

  campagnes!: [];
  speculations!: [];
  indicateurs!: [];

  productionData!: [];

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  affichage:Boolean;
  /************************************** */

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
  loadComextData()
  {
      switch (this.indicateur_params)
      { 
        /*----------------06R014 - Prix moyens des Taureaux, Béliers, Bouc, camelin, asins, porcs, etc.---------*/
        case  86:
          this._loadMarcheBetailData().subscribe(
            spec =>{
    
                let productionData = spec["result"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];
    
                //console.log("status & existe data : "+status+"  "+nbrExistData);
                let i;
    
                if(status === 200)
                { 
                  // speculation : productionData[i]["categoriebet"]["id"],
                  //for(i=0;i<productionData.length;i++)
                  for(i=0;i<productionData.length;i++)
                  { 
                   
                    this.isLoading.next(true);
                    //________________________________Donnee________________________
                   /*  this.variableItemForm.patchValue({
                      valeur : productionData[i]["prix"],
                      mois :   productionData[i]["mois"],
                      annee:   productionData[i]["annee"],
                      speculation : productionData[i]["source"],
                      variable : 15,
                      nom_marche : productionData[i]["marche"]["nomMarche"],
                      type_prix :  productionData[i]["race"]["nomRace"],
                      code_unite : " tete",
                      code_devise : productionData[i]["devise"],
                      divisionadministrative : productionData[i]["niveau2_id"],
                      niveau1_id : productionData[i]["niveau1_id"],
                      pays_id: productionData[i]["pays_id"]
                      }); */
                      //console.log(this.variableItemForm.value);
                        
                    //this._addMarcheBetailVarItem(this.variableItemForm.value).subscribe();
                    //______________________Indicateur_________________________
                   this.indIicateurItemForm.patchValue({
                    valeur_gen:              productionData[i]["prix"],
                    mois:                    1,
                    annee:                   productionData[i]["annee"],
                    speculation:             productionData[i]["speculation"],
                    indicateur:              86,
                    espece:                  '',
                    divisionadministrative:  productionData[i]["pays_id"],
                    niveau1_id:              productionData[i]["pays_id"],
                    pays_id:                 productionData[i]["pays_id"],
                    valid_pfr :              false,
                    valid_pfp :              false,
                    public :                 true
                    });
                    console.log(this.indIicateurItemForm.value);
                    this._addMarcheBetailIndItem(this.indIicateurItemForm.value).subscribe();
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
   
  _loadMarcheBetailData(): Observable<any> {
      let annee = this.debut_campagne;
      let pays = this.pays_params;
      let variable = 15;

      let url;
      if(annee && pays){
        url = this._http.get('http://154.127.90.218:8000/api/marche/marche_prix_betail?params_annee='+annee+'&params_pays='+pays+'&params_variable='+variable)
      }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }

  _addMarcheBetailVarItem(data: any): Observable<any> {

    return this._http.post('http://154.127.90.218:8000/api/marche/marcheBetailVarItem/',data);
   
  }

  _addMarcheBetailIndItem(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/marche/marcheBetailIndItem/',data);
  }


  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays(this.debut_campagne,this.pays_params);
      this.isLoading.next(false);
      this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },45000);
  }


  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_debut,params_pays) {

   
    this.getData_Indicator_Pays(params_debut,params_pays).subscribe({
      next: (res) => {

      
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
        this.affichage = true;
       

      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(params_debut,params_pays): Observable<any> {

     
     return this._http.get('http://154.127.90.218:8000/api/marche/get_indicateur_betail_pays/'+params_debut+'-'+params_pays)
  }

  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }


}
