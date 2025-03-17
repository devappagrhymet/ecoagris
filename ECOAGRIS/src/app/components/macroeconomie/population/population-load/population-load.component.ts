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
  selector: 'app-population-load',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
             MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
              HeaderComponent, AsyncPipe, AsyncPipe, NgFor, MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule,
              AsyncPipe, MatProgressSpinnerModule, MatProgressBarModule, DecimalPipe],
  templateUrl: './population-load.component.html',
  styleUrl: './population-load.component.scss',
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
export class PopulationLoadComponent {
  
  animationStates: { [key: number]: 'default' | 'active' } = {};
    
  generateurForm: FormGroup;
  variableItemForm: FormGroup;
  dataForm: FormGroup;

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
      fin_campagne: '',
      indicateur:''

    });
     /////////////////////Formulaire variable////////////////
     this.variableItemForm = this._fb.group({
        valeur: '',
        speculation: '',
        variable: '',
        debut_campagne: '',
        fin_campagne:'',
        divisionadministrative: '',
        pays_id: ''
    });
    /////////////////////Formulaire indicateur////////////////
    this.dataForm = this._fb.group({
      nombre_pop: '',
      annee: '',
      pays: '',
      valid_pfr:'',
      valid_pfp:'',
      public:''
    });
  }

  displayedColumns: string[] = [
    'id',
    'annee',
    'pays',
    'population',
    'unite'
  ];

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  
  dataSourcePays!: MatTableDataSource<any>;

  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;

  affichage:Boolean;


  /************************************** */
  prodagricIndItemForm: FormGroup;
 
  pays;

  campagnes!: [];
  speculations!: [];
  indicateurs!: [];

  productionData!: [];

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
  loadMacroData()
  {
      this.isLoading.next(true);
      
      this._loadMacroEconomieData().subscribe(
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
                //______________________Donnee Population_________________________
                this.dataForm.patchValue({
                  nombre_pop: productionData[i]["nombre_population"],
                  annee: productionData[i]["annee"],
                  pays: productionData[i]["id_pays_population"],
                  valid_pfr: false,
                  valid_pfp: false,
                  public: true
                });
                // console.log("IND : "+this.indIicateurItemForm.value);
                this._addPopulationData(this.dataForm.value).subscribe();
                //______________________________________________
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
   
  _loadMacroEconomieData(): Observable<any> {
      let pays = 12;
      //console.log('Debut '+annee_debut+' Fin '+annee_fin+' Pays '+pays)

      let url;
      if(pays){
         
          url = this._http.get('http://154.127.90.218:8000/api/population/population');
        }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }


  _addPopulationData(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/pop/data_population/',data);
  }


  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays();
      this.isLoading.next(false);
       this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },15000);
  }

   /*========================Data niveau PAYS======================*/
   _getData_Indicator_Pays() {
    
   
    this.getData_Indicator_Pays().subscribe({
      next: (res) => {
    
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
        this.affichage = true;
        
      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/pop/data_population');
  }

  
  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }






}
