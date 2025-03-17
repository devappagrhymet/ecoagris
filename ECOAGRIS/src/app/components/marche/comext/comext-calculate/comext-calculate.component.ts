import { Component } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-comext-calculate',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
             HeaderComponent, AsyncPipe],
  templateUrl: './comext-calculate.component.html',
  styleUrl: './comext-calculate.component.scss'
})
export class ComextCalculateComponent {
   
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

params_indicateur;
params_annee;
params_pays;


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
      campagne: '',
      indic: ''
    });
   
    /////////////////////Formulaire indicateur////////////////
    this.indIicateurItemForm = this._fb.group({
      valeur_gen: '',
      devise: '',
      quantite:'',
      produit: '',
      indicateur: '',
      debut_campagne: '',
      fin_campagne:'',
      divisionadministrative: '',
      type:'',
      provenance:'',
      destination:'',
      pays_id:'',
      valid_pfr:'',
      valid_pfp:'',
      public:''
    });
  }

  displayedColumns: string[] = [
    'id',
    'code_ind',
    'indicateur',
    'code_var',
    'variable',
    'action'
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

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
     
      this._getCampagneList();
      this._getPaysList();
      this._getIndicateurBySousysteme(2);
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }
   }

   /*==========================================*/
   #______________________Campagne________________
    _getCampagneList()
    {
      this.getCampagneList().subscribe(
        res =>{
          this.campagnes = res;
          //console.log(this.sousSystemes);
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
        },
        error => {
          console.log(error);
        }
      )
   }
   getPaysList(): Observable<any> {
      return this._http.get(' http://154.127.90.218:8000/api/divadmin/pays-list/0');
    }

   _getIndicateurBySousysteme(id)
   {
     this.getIndicateurList(id).subscribe(
       res =>{
          this.indicateurs = res;
          
           /*  this.indicateurs = res.map( 
              (item) => {
                item.calcule == true; 
                return item;
               
              }
            ); */
       },
       error => {
         console.log(error);
       }
     )

     console.log(this.indicateurs["code"]);
   }
 
 
   getIndicateurList(id:number): Observable<any> {
     return this._http.get('http://154.127.90.218:8000/api/indicateur/get_indicateur_sousysteme/'+id);
   }
   

   /*==========================================*/


  _varQuantiteProd(campagne:number, speculation:number, pays:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _varSuperficieCult(campagne:number, speculation:number, pays:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _indRendement(quantite:number, superficie:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/indRendement?quantite='+quantite+'&superficie='+superficie);
  }


  _getSpeculationList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/prodagric/speculation');
  }



   #____________________________
   generateurIndicateur()
   {
      this.isLoading.next(true);

      this.params_indicateur;
      this.params_annee;
      this.params_pays;
      
      switch (this.params_indicateur)
      { 
        case  '06R004':
          this.toastr.warning('Données brute non disponible', 'WARNING');
          this.isLoading.next(false);
          break;
        case  '06R005':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06R007':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06R008':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06R010':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06R012':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06R013':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S001':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S002':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S003':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S004':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S009':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        case  '06S010':
          this.toastr.info('Données brute non disponible', 'INFO');
          this.isLoading.next(false);
          break;
        default:
          break;
      }

      
   }
   
   _uploadProdagricData(): Observable<any> {
      let annee_debut = this.params_annee;
      let annee_fin = this.params_annee + 1;
     
      let pays = this.params_pays;

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
    }

    _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricIndItem/',data);
    }


    getIndicVar(id:number): Observable<any> {
      return this._http.get('http://154.127.90.218:8000/api/indicateur/get_indicateur_variable/'+id);
    }

 
 


  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }


}
