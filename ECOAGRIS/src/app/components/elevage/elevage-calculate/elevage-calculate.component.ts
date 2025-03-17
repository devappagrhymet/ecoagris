import { Component } from '@angular/core';
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
  selector: 'app-elevage-calculate',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
             HeaderComponent, AsyncPipe],
  templateUrl: './elevage-calculate.component.html',
  styleUrl: './elevage-calculate.component.scss'
})
export class ElevageCalculateComponent {
    
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
      campagne: '',
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
      this._getIndicateurBySousysteme(1);
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
      return this._http.get('http://154.127.90.218:8000/api/divadmin/pays-list/0');
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


  _varQuantiteProd(campagne:number, speculation:number, pays:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _varSuperficieCult(campagne:number, speculation:number, pays:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _indRendement(quantite:number, superficie:number){
    return this._http.get('http://154.127.90.218:8000/api/prodagric/indRendement?quantite='+quantite+'&superficie='+superficie);
  }

 

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



   #____________________________
   uploadProdagricData()
   {
      this.isLoading.next(true);
      //______________________Superficie pour toutes les speculation_________________________
       this._uploadProdagricData().subscribe(
        spec =>{

            let productionData = spec["data"];
            let status = spec["status"];
            let message = spec["message"];
            let nbrExistData = spec["nbrExistData"];

            //console.log("status & existe data : "+status+"  "+nbrExistData);
          

            let i;

            let limit:number = productionData.length - 1;

            if(status == 200 && nbrExistData == 0)
            {
              
              for(i=0;i<productionData.length;i++)
              { 
                //________________________________Variable superficie________________________
                this.variableItemForm.patchValue({
                  valeur: productionData[i]["superficie_production_agricole"],
                  pays_id: productionData[i]["pays_production_agricole"],
                  campagne: productionData[i]["annee_production_agricole"],
                  divisionadministrative: productionData[i]["id_division_administrative"],
                  speculation: productionData[i]["id_produit"],
                  variable: 2
                });
                this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                
                //______________________O5R004 SUPERFICIE id:52_________________________
                this.indIicateurItemForm.patchValue({
                    campagne: productionData[i]["annee_production_agricole"],
                    speculation: productionData[i]["id_produit"],
                    indicateur: 52,
                    divisionadministrative: productionData[i]["id_division_administrative"],
                    pays_id: productionData[i]["pays_production_agricole"],
                    valeur_gen: productionData[i]["superficie_production_agricole"],
                    valid_pfr: false,
                    valid_pfp: false,
                    public: true
                });
                this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();

                //______________________O5R005 RENDEMENT id: 53_________________________
                this.indIicateurItemForm.patchValue({
                      campagne: productionData[i]["annee_production_agricole"],
                      speculation: productionData[i]["id_produit"],
                      indicateur: 53,
                      divisionadministrative: productionData[i]["id_division_administrative"],
                      pays_id: productionData[i]["pays_production_agricole"],
                      valeur_gen: productionData[i]["rendement_production_agricole"],
                      valid_pfr: false,
                      valid_pfp: false,
                      public: true
                  });
                  this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                
                //________________________________Variable production________________________
                this.variableItemForm.patchValue({
                  valeur: productionData[i]["quantite_production_agricole"],
                  pays_id: productionData[i]["pays_production_agricole"],
                  campagne: productionData[i]["annee_production_agricole"],
                  divisionadministrative: productionData[i]["id_division_administrative"],
                  speculation: productionData[i]["id_produit"],
                  variable: 1
                });

                this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                //______________________O5R006 PRODUCTION id: 54_________________________
                this.indIicateurItemForm.patchValue({
                    campagne: productionData[i]["annee_production_agricole"],
                    speculation: productionData[i]["id_produit"],
                    indicateur: 54,
                    divisionadministrative: productionData[i]["id_division_administrative"],
                    pays_id: productionData[i]["pays_production_agricole"],
                    valeur_gen: productionData[i]["quantite_production_agricole"],
                    valid_pfr: false,
                    valid_pfp: false,
                    public: true
                });
                this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                //______________________________________________
                if(i == limit)
                {
                    this.isLoading.next(false);
                }
              }

            }
            else if(status == 200 && nbrExistData > 0)
            {
              this.isLoading.next(false);
              this.toastr.info('Données production agricole pour  cette campagne existe deja dans la BD', 'INFO');
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

      this.isLoading.next(false);
   }
   
   _uploadProdagricData(): Observable<any> {
      let annee_debut = this.campagne_params;
      let annee_fin = this.campagne_params + 1;
     
      let pays = this.pays_params;

      // return this._http.get('http://154.127.90.218:8000/api/prodagric/getDataProductionAgricole?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays);
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

   

    _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/prodagric/prodagricIndItem/',data);
    }




   addIndicVar(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/indicateur/indicateurVariable/', data);
  }

 

   _getIndicVar(id) {
    //getIIndicVar
    this.getIndicVar(id).subscribe({
      next: (res) => {
        //this.dataSource = new MatTableDataSource(res['results']);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getIndicVar(id:number): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/indicateur/get_indicateur_variable/'+id);
  }

 

  _updateIndicateur(id) {
    this.router.navigate(['/indicateur/add-edit/'+id]);
  }


  _deleteIndicVar(id){
    var result = confirm("Voulez-vous vraiment supprimmer cette variable ?");
    if(id && result)
    {
        this.deleteIndicVar(id).subscribe({
        next: (res) => {
            alert(" Suppression effectué avec success! ");
            this._getIndicVar(this.indicValue);
        },
        error: console.log,
        });
    }
  }

  deleteIndicVar(id: number): Observable<any> {
    return this._http.delete(`http://154.127.90.218:8000/api/indicateur/indicateurVariable/${id}`);
  }
  /***************************************************/

  onChange(){
    if(this.selectedValue){
      this._getVariableList(this.selectedValue);
      this._getIndicateurBySousysteme(this.selectedValue);
    }
  }

  onChangeIndicateur(){
    if(this.indicValue){
      this._getIndicVar(this.indicValue);
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
