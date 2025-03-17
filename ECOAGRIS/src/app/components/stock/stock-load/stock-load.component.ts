import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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
  selector: 'app-stock-load',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
     HeaderComponent, AsyncPipe, AsyncPipe, NgFor, MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule,
     AsyncPipe, MatProgressSpinnerModule, MatProgressBarModule ],
  templateUrl: './stock-load.component.html',
  styleUrl: './stock-load.component.scss',
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
export class StockLoadComponent {
   
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
  indicateur_params;

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
      speculation: '',
      stock_initiaux_paysan: '',
      stock_finaux_paysan: '',
      stock_initiaux_inst: '',
      stock_finaux_inst: '',
      stock_initiaux_autre: '',
      stock_finaux_autre: '',
      unite:'',
      categorie_spe:'',
      debut_campagne:'',
      fin_campagne:'',
      pays: '',
      valid_pfr:'',
      valid_pfp:'',
      public:''
    });
  }

  displayedColumns: string[] = [
    'id',
    'campagne',
    'pays',
    'speculation',
    'categoriespe',
    'init_paysan',
    'finaux_paysan',
    'init_inst',
    'finaux_inst',
    'init_autre',
    'finaux_autre',
    'unite',
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
      
      this._loadStockData().subscribe(
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
                  speculation: productionData[i]["id_produit"],
                  stock_initiaux_paysan: productionData[i]["stocks_initiaux_paysants"],
                  stock_finaux_paysan: productionData[i]["stocks_finaux_paysants"],
                  stock_initiaux_inst: productionData[i]["stocks_initiaux_institutionnel"],
                  stock_finaux_inst: productionData[i]["stocks_finaux_institutionnel"],
                  stock_initiaux_autre: productionData[i]["autres_stocks_initiaux"],
                  stock_finaux_autre: productionData[i]["autres_stocks_finaux"],
                  unite: 'Tonne',
                  categorie_spe: productionData[i]["categorie_id"],
                  debut_campagne: productionData[i]["debut_campagne"],
                  fin_campagne: productionData[i]["fin_campagne"],
                  pays: productionData[i]["pays_stock"],
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
   
  _loadStockData(): Observable<any> {
     
      let annee_debut = this.debut_campagne;
      let annee_fin = this.fin_campagne;
      let pays = this.pays_params;
      
      //console.log('Debut '+annee_debut+' Fin '+annee_fin+' Pays '+pays)

      let url;
      if(pays){
         
          url = this._http.get('http://154.127.90.218:8000/api/stock/stock?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays);
    
        }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }


  _addPopulationData(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/stock/data_stock/',data);
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
    return this._http.get('http://154.127.90.218:8000/api/stock/data_stock');
  }

  
  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }






}
