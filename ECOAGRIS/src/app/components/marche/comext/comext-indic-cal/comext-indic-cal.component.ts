import { Component } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { AsyncPipe, CurrencyPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-comext-indic-cal',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
     HeaderComponent, AsyncPipe, DecimalPipe,  MatProgressSpinnerModule, MatProgressBarModule, CurrencyPipe],
  templateUrl: './comext-indic-cal.component.html',
  styleUrl: './comext-indic-cal.component.scss'
})
export class ComextIndicCalComponent {
    
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
      unite_devise: '',
      indicateur: '',
      annee:  '',
      type:  '',
      divisionadministrative: '',
      valid_pfr: '',
      valid_pfp: '',
      public: ''
    });
  }

 
  displayedColumns: string[] = [
    'id',
    'division',
    'indicateur',
    'valeur',
    'unite'
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

  affichage:Boolean;

  
  dataSourcePays!: MatTableDataSource<any>;

  @ViewChild('paginatorPays') paginatorPays: MatPaginator;
  @ViewChild('sortPays') sortPays!: MatSort;



  valeur_total_imp:number = 1;
  valeur_total_exp:number = 1;
  qte_total_imp:number = 1;
  qte_total_exp:number = 1;


  taux_dollar_us;

  /************************************** */

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
     
      this._getCampagneList();
      this._getPaysList();
      //this._getIndicateurBySousysteme(2);
      this.devise();
      /*===================*/
      this.affichage = false;

      
      for (let index in this.dataSourcePays) {
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

     //console.log(this.indicateurs["code"]);
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

  
  onChangeCampagne(event){
    this.params_annee = event.value;
    this.valeurTotalImportation(this.params_annee);
    this.quantiteTotalImportation(this.params_annee);
    this.quantiteTotalExportation(this.params_annee);
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
        case  88:
            /**********************************************************************************/
              let importation_type = 'importation';
              this._valeurImportExport(this.params_annee,importation_type).subscribe(
                spec =>{
        
                  let productionData = spec["result"];
                  let status = spec["status"];
                  let message = spec["message"];
                  
                    let i;

                    if(status == 200)
                    {
                      
                      for(i=0;i<productionData.length;i++)
                      { 
                        this.isLoading.next(true);

                        this.indIicateurItemForm.patchValue({
                            valeur_gen:             productionData[i]["valeur"],
                            unite_devise:           productionData[i]["devise"],
                            indicateur:             88,
                            annee:                  productionData[i]["fin_campagne"],
                            type:                   productionData[i]["type"],
                            divisionadministrative: productionData[i]["pays_id"],
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
        case  84:
               /**********************************************************************************/
               let exportation_type = 'exportation';
               this._valeurImportExport(this.params_annee,exportation_type).subscribe(
                 spec =>{
         
                   let productionData = spec["result"];
                   let status = spec["status"];
                   let message = spec["message"];
                   
                     let i;
 
                     if(status == 200)
                     {
                       
                       for(i=0;i<productionData.length;i++)
                       { 
                         this.isLoading.next(true);
 
                         this.indIicateurItemForm.patchValue({
                             valeur_gen:             productionData[i]["valeur"],
                             unite_devise:           productionData[i]["devise"],
                             indicateur:             84,
                             annee:                  productionData[i]["fin_campagne"],
                             type:                   productionData[i]["type"],
                             divisionadministrative: productionData[i]["pays_id"],
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
        case  97:
                  /**********************************************************************************/
                  let exportation_usd_type = 'exportation';
                  this._valeurImportExport(this.params_annee,exportation_usd_type).subscribe(
                    spec =>{
            
                      let productionData = spec["result"];
                      let status = spec["status"];
                      let message = spec["message"];
                      
                        let i;

                        if(status == 200)
                        {
                          
                          for(i=0;i<productionData.length;i++)
                          { 
                            this.isLoading.next(true);

                            this.indIicateurItemForm.patchValue({
                                valeur_gen:             productionData[i]["valeur"] / this.taux_dollar_us,
                                unite_devise:           '$ US',
                                indicateur:             97,
                                annee:                  productionData[i]["fin_campagne"],
                                type:                   productionData[i]["type"],
                                divisionadministrative: productionData[i]["pays_id"],
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
        case  89:
              /**********************************************************************************/
                let depan_type = 'importation';
                this._valeurImportExport(this.params_annee,depan_type).subscribe(
                  spec =>{
          
                    let productionData = spec["result"];
                    let status = spec["status"];
                    let message = spec["message"];
                    
                      let i;
  
                      if(status == 200)
                      {
                        
                        for(i=0;i<productionData.length;i++)
                        { 
                          this.isLoading.next(true);
  
                          this.indIicateurItemForm.patchValue({
                              valeur_gen:             productionData[i]["valeur"],
                              unite_devise:           productionData[i]["devise"],
                              indicateur:             89,
                              annee:                  productionData[i]["fin_campagne"],
                              type:                   productionData[i]["type"],
                              divisionadministrative: productionData[i]["pays_id"],
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
        case  90:
              /**********************************************************************************/
              let alpha = 'importation';
              this._valeurImportExport(this.params_annee,alpha).subscribe(
                spec =>{
        
                  let productionData = spec["result"];
                  let status = spec["status"];
                  let message = spec["message"];
                  
                  let i;

                  let part;

                    if(status == 200)
                    {
                      
                      for(i=0;i<productionData.length;i++)
                      { 
                        this.isLoading.next(true);

                        part = ((productionData[i]["valeur"] / this.valeur_total_imp) * 100);


                        //console.log('valeur :'+productionData[i]["valeur"]+' total imp : '+this.valeur_total_imp+' part :'+part)

                          this.indIicateurItemForm.patchValue({
                            valeur_gen:             part,
                            unite_devise:           '%',
                            indicateur:             90,
                            annee:                  productionData[i]["fin_campagne"],
                            type:                   productionData[i]["type"],
                            divisionadministrative: productionData[i]["pays_id"],
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
        case  91:
               /**********************************************************************************/
               let beta = 'importation';
               this._quantiteImportExport(this.params_annee,beta).subscribe(
                 spec =>{
         
                   let productionData = spec["result"];
                   let status = spec["status"];
                   let message = spec["message"];
                   
                   let i;
 
                   let qte;
 
                     if(status == 200)
                     {
                       
                       for(i=0;i<productionData.length;i++)
                       { 
                         this.isLoading.next(true);
 
                         qte = ((productionData[i]["quantite"] / this.qte_total_imp) * 100);
 
                         console.log('quantite :'+productionData[i]["quantite"]+' total imp : '+this.qte_total_imp+' part :'+qte)
 
                           this.indIicateurItemForm.patchValue({
                             valeur_gen:             qte,
                             unite_devise:           '%',
                             indicateur:             91,
                             annee:                  productionData[i]["fin_campagne"],
                             type:                   productionData[i]["type"],
                             divisionadministrative: productionData[i]["pays_id"],
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
        case  99:
              /**********************************************************************************/
              let sigma = 'exportation';
              this._quantiteImportExport(this.params_annee,sigma).subscribe(
                spec =>{
        
                  let productionData = spec["result"];
                  let status = spec["status"];
                  let message = spec["message"];
                  
                    let i;

                    if(status == 200)
                    {
                      
                      for(i=0;i<productionData.length;i++)
                      { 
                        this.isLoading.next(true);

                        this.indIicateurItemForm.patchValue({
                            valeur_gen:             productionData[i]["quantite"],
                            unite_devise:           'Tonne',
                            indicateur:             99,
                            annee:                  productionData[i]["fin_campagne"],
                            type:                   productionData[i]["type"],
                            divisionadministrative: productionData[i]["pays_id"],
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
        case  96:
           /**********************************************************************************/
           let teta = 'exportation';
           this._quantiteImportExport(this.params_annee,teta).subscribe(
             spec =>{
     
               let productionData = spec["result"];
               let status = spec["status"];
               let message = spec["message"];
               
                 let i;

                 if(status == 200)
                 {
                   
                   for(i=0;i<productionData.length;i++)
                   { 
                     let exp
                     this.isLoading.next(true);

                     exp = ((productionData[i]["quantite"] / this.qte_total_exp) * 100);

                     this.indIicateurItemForm.patchValue({
                         valeur_gen:             exp,
                         unite_devise:           '%',
                         indicateur:             96,
                         annee:                  productionData[i]["fin_campagne"],
                         type:                   productionData[i]["type"],
                         divisionadministrative: productionData[i]["pays_id"],
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
        case  77:
              /**********************************************************************************/
              let gamma = 'importation';

              let annee_1 = this.params_annee - 1;

              this._valeurImportExport(annee_1,gamma).subscribe(
                tmp =>{
                      
                    let donnees_1 = tmp["result"];
                    let status_1 =  tmp["status"];

                    let i;
                    
                    if(status_1 == 200)
                    {

                      this._valeurImportExport(this.params_annee,gamma).subscribe(
                        spec =>{
                
                          let productionData = spec["result"];
                          let status = spec["status"];
                          let message = spec["message"];
                          
                            let j;

                            if(status == 200)
                            {

                              for(i=0;i<donnees_1.length;i++)
                              { 
                              
                                for(j=0;j<productionData.length;j++)
                                { 

                                    if(productionData[j]["pays_id"] == donnees_1[i]["pays_id"])
                                    {
                                     
                                      let mouton = ((productionData[j]["valeur"] - donnees_1[i]["valeur"]) / donnees_1[i]["valeur"]) * 100;
                                     
                                      this.isLoading.next(true);

                                      this.indIicateurItemForm.patchValue({
                                          valeur_gen:             mouton,
                                          unite_devise:           '%',
                                          indicateur:             77,
                                          annee:                  productionData[j]["fin_campagne"],
                                          type:                   productionData[j]["type"],
                                          divisionadministrative: productionData[j]["pays_id"],
                                          valid_pfr: false,
                                          valid_pfp: false,
                                          public: true
                                      });
                                      this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                                    }
                                }
                              }
                              this.setTimeOut();
                            }
                            else
                            {
                              this.isLoading.next(false);
                              this.toastr.warning('Données de l\'année n '+this.params_annee+' non disponible', 'NOTIFICATION');
                            }
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }
                 

                  },
                  error => {
                    console.log(error);
                  }
            );
          break;
        case  92:
              /**********************************************************************************/
              let epsilon = 'exportation';

              let year_1 = this.params_annee - 1;

              this._quantiteImportExport(year_1,epsilon).subscribe(
                tmp =>{
                      
                    let donnees_1 = tmp["result"];
                    let status_1 =  tmp["status"];

                    let i;
                    
                    if(status_1 == 200)
                    {

                      this._quantiteImportExport(this.params_annee,epsilon).subscribe(
                        spec =>{
                
                          let productionData = spec["result"];
                          let status = spec["status"];
                          let message = spec["message"];
                          
                            let j;

                            if(status == 200)
                            {

                              for(i=0;i<donnees_1.length;i++)
                              { 
                              
                                for(j=0;j<productionData.length;j++)
                                { 

                                    if(productionData[j]["pays_id"] == donnees_1[i]["pays_id"])
                                    {
                                     
                                      let mouton = ((productionData[j]["quantite"] - donnees_1[i]["quantite"]) / donnees_1[i]["quantite"]) * 100;
                                     
                                      this.isLoading.next(true);

                                      this.indIicateurItemForm.patchValue({
                                          valeur_gen:             mouton,
                                          unite_devise:           'Tonne',
                                          indicateur:             92,
                                          annee:                  productionData[j]["fin_campagne"],
                                          type:                   productionData[j]["type"],
                                          divisionadministrative: productionData[j]["pays_id"],
                                          valid_pfr: false,
                                          valid_pfp: false,
                                          public: true
                                      });
                                      this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                                    }
                                }
                              }
                              this.setTimeOut();
                            }
                            else
                            {
                              this.isLoading.next(false);
                              this.toastr.warning('Données de l\'année n '+this.params_annee+' non disponible', 'NOTIFICATION');
                            }
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }
                 
                  },
                  error => {
                    console.log(error);
                  }
            );
          break;
        case  93:
                /**********************************************************************************/
              let zeta = 'importation';

              let annee_imp_1 = this.params_annee - 1;

              this._valeurImportExport(annee_imp_1,zeta).subscribe(
                tmp =>{
                      
                    let donnees_1 = tmp["result"];
                    let status_1 =  tmp["status"];

                    let i;
                    
                    if(status_1 == 200)
                    {

                      this._valeurImportExport(this.params_annee,gamma).subscribe(
                        spec =>{
                
                          let productionData = spec["result"];
                          let status = spec["status"];
                          let message = spec["message"];
                          
                            let j;

                            if(status == 200)
                            {

                              for(i=0;i<donnees_1.length;i++)
                              { 
                              
                                for(j=0;j<productionData.length;j++)
                                { 

                                    if(productionData[j]["pays_id"] == donnees_1[i]["pays_id"])
                                    {
                                     
                                      let mouton = ((productionData[j]["valeur"] - donnees_1[i]["valeur"]) / donnees_1[i]["valeur"]) * 100;
                                     
                                      this.isLoading.next(true);

                                      this.indIicateurItemForm.patchValue({
                                          valeur_gen:             mouton,
                                          unite_devise:           '%',
                                          indicateur:             77,
                                          annee:                  productionData[j]["fin_campagne"],
                                          type:                   productionData[j]["type"],
                                          divisionadministrative: productionData[j]["pays_id"],
                                          valid_pfr: false,
                                          valid_pfp: false,
                                          public: true
                                      });
                                      this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
                                    }
                                }
                              }
                              this.setTimeOut();
                            }
                            else
                            {
                              this.isLoading.next(false);
                              this.toastr.warning('Données de l\'année n '+this.params_annee+' non disponible', 'NOTIFICATION');
                            }
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }
                 

                  },
                  error => {
                    console.log(error);
                  }
            );
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

   _valeurImportExport(params_annee,params_type): Observable<any> {
    let url;
    if(params_annee && params_type){
     
        url = this._http.get('http://154.127.90.218:8000/api/marche/valeur_total_impexp_pays?params_annee='+params_annee+'&params_type='+params_type)
    }
    else
    { 
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
  }


  _quantiteImportExport(params_annee,params_type): Observable<any> {
    let url;
    if(params_annee && params_type){
     
        url = this._http.get('http://154.127.90.218:8000/api/marche/qte_total_impexp_pays?params_annee='+params_annee+'&params_type='+params_type)
    }
    else
    { 
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
  }
   
  _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/marche/comextIndItem/',data);
  }


  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays(this.params_annee,this.params_indicateur);
      this.isLoading.next(false);
      this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },15000);
  }


  /*========================Data niveau PAYS======================*/
  _getData_Indicator_Pays(params_annee,params_indicateur) {

   
    this.getData_Indicator_Pays(params_annee,params_indicateur).subscribe({
      next: (res) => {

      
        this.dataSourcePays = new MatTableDataSource(res);
        this.dataSourcePays.sort = this.sortPays;
        this.dataSourcePays.paginator = this.paginatorPays;
        this.affichage = true;
       

      },
      error: console.log,
    });
  }

  getData_Indicator_Pays(params_annee,params_indicateur): Observable<any> {

     
     return this._http.get('http://154.127.90.218:8000/api/marche/get_indicateur_comext/'+params_annee+'-'+params_indicateur)
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

  valeurTotalImportation(params_annee){
    let importation_type = 'importation';
    this._http.get('http://154.127.90.218:8000/api/marche/valeur_total_impexp_all?params_annee='+params_annee+'&params_type='+importation_type).subscribe(
      spec =>{

        if(spec["status"] == 200)
        {
          this.valeur_total_imp = spec["result"][0]["valeur"];
        }
        else
        {
          this.valeur_total_imp = 1;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  valeurTotalExportation(params_annee){
    let importation_type = 'exportation';
    this._http.get('http://154.127.90.218:8000/api/marche/valeur_total_impexp_all?params_annee='+params_annee+'&params_type='+importation_type).subscribe(
      spec =>{

        if(spec["status"] == 200)
        {
          this.valeur_total_exp = spec["result"][0]["valeur"];
        }
        else
        {
          this.valeur_total_imp = 1;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  quantiteTotalImportation(params_annee){
    let importation_type = 'importation';
    this._http.get('http://154.127.90.218:8000/api/marche/quantite_total_impexp_all?params_annee='+params_annee+'&params_type='+importation_type).subscribe(
      spec =>{

        if(spec["status"] == 200)
        {
          this.qte_total_imp = spec["result"][0]["quantite"];
        }
        else
        {
          this.qte_total_imp = 1;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  quantiteTotalExportation(params_annee){
    let importation_type = 'exportation';
    this._http.get('http://154.127.90.218:8000/api/marche/quantite_total_impexp_all?params_annee='+params_annee+'&params_type='+importation_type).subscribe(
      spec =>{

        if(spec["status"] == 200)
        {
          this.qte_total_exp = spec["result"][0]["quantite"];
        }
        else
        {
          this.qte_total_exp = 1;
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  devise(){
    this._http.get('https://api.fastforex.io/fetch-all?api_key=18b1af1bd1-a10a565549-ssjc55').subscribe(
      spec =>{
        this.taux_dollar_us = spec["results"]["XOF"];

        //console.log('Taux dollar'+this.taux_dollar_us);
       
      },
      error => {
        console.log(error);
      }
    );
  }


}
