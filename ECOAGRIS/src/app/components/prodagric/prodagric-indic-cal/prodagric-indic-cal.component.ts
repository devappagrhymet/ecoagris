import { Component } from '@angular/core';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-prodagric-indic-cal',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
     HeaderComponent, AsyncPipe, DecimalPipe, MatProgressSpinnerModule, MatProgressBarModule, ],
  templateUrl: './prodagric-indic-cal.component.html',
  styleUrl: './prodagric-indic-cal.component.scss'
})
export class ProdagricIndicCalComponent {

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
     /////////////////////Formulaire variable////////////////
     this.variableItemForm = this._fb.group({
        valeur: '',
        pays_id: '',
        campagne: '',
        divisionadministrative: '',
        speculation: '',
        variable: ''
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
    'indicateur',
    'categorie',
    'speculation',
    'valeur',
    'unite'
  ];

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

      this._getCampagneList();
      this._getPaysList();
      this._getIndicateurBySousysteme(1);
      /*===================*/
      for (let index in this.dataSourcePays) {
        this.animationStates[index] = 'default';
      }

      this.affichage = false;
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
  _getProdagricIndItemList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/prodagric/prodagricIndItemList');
  }

  _addProdagricVarItem(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricVarItem/',data);
  }


  _getVarItemList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/prodagric/prodagricVarItemList/');
  }

  _getSpeculationList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/prodagric/speculation');
  }

  /*==============================*/

  onChangeIndicateur(event){

    this.indicValue = event.value;

  }

  calculeIndicateur()
  {
    switch (this.indicValue)
    {
      /*********************************INDICATEUR SUPERFICIE*************************************************/
      case 52:
          this._fetchProdagricData().subscribe(
            spec =>{

                let productionData = spec["data"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];

                let i;

                if(status == 200)
                {

                  for(i=0;i<nbrExistData;i++)
                  {
                    this.isLoading.next(true);

                    this.indIicateurItemForm.patchValue({
                      debut_campagne: productionData[i]["debut_campagne"],
                      fin_campagne:   productionData[i]["fin_campagne"],
                      speculation:    productionData[i]["speculation"]["id"],
                      indicateur: 52,
                      divisionadministrative: productionData[i]["divisionadministrative"]["id"],
                      pays_id: productionData[i]["divisionadministrative"]["id_pays"],
                      valeur_gen: productionData[i]["superficie_prod_agricole"],
                      valid_pfr: false,
                      valid_pfp: false,
                      public: true
                    });
                    this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                  }
                  this.setTimeOut();
                }
                else
                {
                  this.isLoading.next(false);
                  this.toastr.warning('Données production agricole non disponible à la source pour cette campagne', 'NOTIFICATION');
                }
            },
            error => {
              console.log(error);
            }
          );
        break;
      /*********************************INDICATEUR RENDEMENT*************************************************/
      case 53:
          this._fetchProdagricData().subscribe(
            spec =>{

                let productionData = spec["data"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];

                let i;

                if(status == 200)
                {

                  for(i=0;i<nbrExistData;i++)
                  {
                    this.isLoading.next(true);

                    this.indIicateurItemForm.patchValue({
                      debut_campagne: productionData[i]["debut_campagne"],
                      fin_campagne:   productionData[i]["fin_campagne"],
                      speculation:    productionData[i]["speculation"]["id"],
                      indicateur: 53,
                      divisionadministrative: productionData[i]["divisionadministrative"]["id"],
                      pays_id: productionData[i]["divisionadministrative"]["id_pays"],
                      valeur_gen: productionData[i]["rendement_prod_agricole"],
                      valid_pfr: false,
                      valid_pfp: false,
                      public: true
                    });
                    this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                  }
                  this.setTimeOut();

                }
                else
                {
                  this.isLoading.next(false);
                  this.toastr.warning('Données production agricole non disponible à la source pour cette campagne', 'NOTIFICATION');
                }
            },
            error => {
              console.log(error);
            }
          );
        break;
      /*********************************INDICATEUR PRODUCTION*************************************************/
      case 54:
          this._fetchProdagricData().subscribe(
            spec =>{

                let productionData = spec["data"];
                let status = spec["status"];
                let message = spec["message"];
                let nbrExistData = spec["nbrExistData"];
                let i;

                if(status == 200)
                {
                  for(i=0;i<nbrExistData;i++)
                  {
                    this.isLoading.next(true);

                    this.indIicateurItemForm.patchValue({
                      debut_campagne: productionData[i]["debut_campagne"],
                      fin_campagne:   productionData[i]["fin_campagne"],
                      speculation:    productionData[i]["speculation"]["id"],
                      indicateur: 54,
                      divisionadministrative: productionData[i]["divisionadministrative"]["id"],
                      pays_id: productionData[i]["divisionadministrative"]["id_pays"],
                      valeur_gen: productionData[i]["quantite_prod_agricole"],
                      valid_pfr: false,
                      valid_pfp: false,
                      public: true
                    });
                    this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                  }
                  this.setTimeOut();

                }
                else
                {
                  this.isLoading.next(false);
                  this.toastr.warning('Données production agricole non disponible à la source pour cette campagne', 'NOTIFICATION');
                }
            },
            error => {
              console.log(error);
            }
          );
        break;
      /****************************INDICATEUR PRODUCTION CEREALIERE PAR CAPITA********************************/
      case 55:
        this._fetchProductionCerealData().subscribe(
          spec =>{

              let productionData = spec["result"];
              let status = spec["status"];
              let message = spec["message"];
              let nbrExistData = spec["nbrExistData"];
              let i;

              if(status == 200)
              {
                for(i=0;i<productionData.length;i++)
                {
                  this.isLoading.next(true);

                 let production = productionData[i]["quantite_production"] * 1000;

                  this.indIicateurItemForm.patchValue({
                    debut_campagne: productionData[i]["debut_campagne"],
                    fin_campagne:   productionData[i]["fin_campagne"],
                    speculation:    187,
                    indicateur: 55,
                    divisionadministrative: productionData[i]["divisionadministrative"],
                    pays_id: productionData[i]["pays_id"],
                    valeur_gen:   production  / 20871000,
                    valid_pfr: false,
                    valid_pfp: false,
                    public: true
                  });
                  this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                }
                this.setTimeOut();
              }
              else
              {
                this.isLoading.next(false);
                this.toastr.warning('Données production agricole non disponible à la source pour cette campagne', 'NOTIFICATION');
              }
          },
          error => {
            console.log(error);
          }
        );
      break;
      /******************************default*************************************************************** */
      default:

        break;
    }
  }

  _fetchProdagricData(): Observable<any> {
      let annee_debut = this.campagne_params;
      let annee_fin = this.campagne_params + 1;

      let pays = this.pays_params;

      let url;
      if(annee_debut && annee_fin && pays){
          url = this._http.get('http://154.127.90.218:8000/api/prodagric/fetchProdagric?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays);
      }
      else
      {
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }


  _fetchProductionCerealData(): Observable<any> {
    let annee_debut = this.campagne_params;
    let annee_fin = this.campagne_params + 1;

    let pays = this.pays_params;

    let url;
    if(annee_debut && annee_fin && pays){
        url = this._http.get('http://154.127.90.218:8000/api/prodagric/fetchProdCerealiere?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays);
    }
    else
    {
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
}

  /*================================*/
  _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricIndItem/',data);
  }


  setTimeOut(){
    let annee_debut = this.campagne_params;
    let annee_fin = this.campagne_params + 1;

    setTimeout(()=>{
      this._getData_Indicator_Pays(annee_debut,annee_fin,this.pays_params,this.indicValue);
      this.isLoading.next(false);
       this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },45000);
  }

  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur) {

      this.getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur).subscribe({
        next: (res) => {
          this.dataSourcePays = new MatTableDataSource(res);
          this.dataSourcePays.sort = this.sortPays;
          this.dataSourcePays.paginator = this.paginatorPays;
          this.affichage = true;
        },
        error: console.log,
      });
  }

  getData_Indicator_Pays(params_debut,params_fin,params_pays,params_indicateur): Observable<any> {
    //return this._http.get('http://154.127.90.218:8000/api/prodagric/prodagricIndItemList');
    return this._http.get('http://154.127.90.218:8000/api/prodagric/get_prodagric_indicateur/'+params_debut+'-'+params_fin+'-'+params_pays+'-'+params_indicateur);
  }







  addIndicVar(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/indicateur/indicateurVariable/', data);
  }




  _updateIndicateur(id) {
    this.router.navigate(['/indicateur/add-edit/'+id]);
  }



  /***************************************************/

  onChange(){
    if(this.selectedValue){
      this._getVariableList(this.selectedValue);
      this._getIndicateurBySousysteme(this.selectedValue);
    }
  }

  _getVariableList(id) {
      this.getVariableList(id).subscribe(
        res => {

          this.variables = res;

        },
        error => {
          console.log(error);
        }
      );
  }

  getVariableList(id:number): Observable<any> {
      return this._http.get('http://154.127.90.218:8000/api/indicateur/get_variable_sousysteme/'+id);
  }




  _getSousystemeList()
  {
    this.getSousystemeList().subscribe(
      res =>{
        this.sousSystemes = res;

      },
      error => {
        console.log(error);
      }
    )
  }


  getSousystemeList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/parametre/sous_systemes');
  }



  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
