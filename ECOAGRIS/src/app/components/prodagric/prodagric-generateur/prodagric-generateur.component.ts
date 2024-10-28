import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-prodagric-generateur',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule, HeaderComponent],
  templateUrl: './prodagric-generateur.component.html',
  styleUrl: './prodagric-generateur.component.scss',
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
export class ProdagricGenerateurComponent {
  
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
  ) {

    this.generateurForm = this._fb.group({
      pays: '',
      campagne: '',
      indic: ''
    });
     /////////////////////Formulaire variable////////////////
     this.variableItemForm = this._fb.group({
      campagne: '',
      speculation: '',
      variable: '',
      divisionadministrative: '',
      valeur: ''
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
 
  pays = [
    {"id":"1","nom":"Bénin"},
    {"id":"2","nom":"Burkina Faso"},
    {"id":"12","nom":"Niger"},
  ];

  campagnes!: [];
  speculations!: [];
  indicateurs!: [];

  productionData!: [];
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
      return this._http.get('http://127.0.0.1:8000/api/parametre/campagnes');
    }
   #______________________pays________________
   _getPaysList()
   {
     return this.pays;
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
     return this._http.get('http://127.0.0.1:8000/api/indicateur/get_indicateur_sousysteme/'+id);
   }
   

   /*==========================================*/

   #_____________________________
   onFormSubmit(){ 

    switch (this.indicValue)
    {  
      case 4:
        //alert('4  case');
        //______________________Superficie pour toutes les speculation_________________________
        this._getSpeculationList().subscribe(
            spec =>{
                let sepculations = spec;
                let i;
                for(i=0;i<sepculations.length;i++)
                {
                  let speculation = sepculations[i]["id"];
                
                  //______________________Variable Superficie_________________________
                  this._varSuperficieCult(2024,speculation,pays).subscribe(
                    addis =>{
                          //___
                          this.varSuperficieCult = addis["data"][0]["supCultivee"];
                            
                          this.variableItemForm.patchValue({
                            campagne: 3,
                            speculation: speculation,
                            variable: 7,
                            divisionadministrative: pays,
                            valeur: this.varSuperficieCult
                          });

                          this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                          //_____

                          /*********************************INDICATEUR SUPERFICIE*************************************************/
                          this.indIicateurItemForm.patchValue({
                            campagne: 3,
                            speculation: speculation,
                            indicateur: 4,
                            divisionadministrative: pays,
                            valeur_gen: this.varSuperficieCult,
                            valid_pfr: false,
                            valid_pfp: false
                          });
                          this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();

                          //console.log(this.indIicateurItemForm.value);
                          
                          this.router.navigate(['/prodagric/indicitem']);

                       
                        /*********************************Fin INDICATEUR superficie*************************************************/
                    },
                    error => {
                      console.log(error);
                    }
                  );
                  //______________________________________________
                }
          },
          error => {
            console.log(error);
          }
        );
        break;

      case 5:
        //alert('5  case');
        //______________________Rendement pout toutes les speculation_________________________
          this._getSpeculationList().subscribe(
            spec =>{
                let sepculations = spec;
                let i;
                for(i=0;i<sepculations.length;i++)
                {
                  let speculation = sepculations[i]["id"];
                    //______________________Variable quantite produite_________________________
                    this._varQuantiteProd(2024,speculation,pays).subscribe(
                      mouton =>{
                        //____
                          this.varQuantiteProd = mouton["data"][0]["quantiteProd"];

                          this.variableItemForm.patchValue({
                            campagne: 3,
                            speculation: speculation,
                            variable: 8,
                            divisionadministrative: pays,
                            valeur: this.varQuantiteProd
                          });

                          this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                      
                          //______________________Variable Superficie_________________________
                          this._varSuperficieCult(2024,speculation,pays).subscribe(
                            addis =>{
                                  //___
                                  this.varSuperficieCult = addis["data"][0]["supCultivee"];
                                    
                                  this.variableItemForm.patchValue({
                                    campagne: 3,
                                    speculation: speculation,
                                    variable: 7,
                                    divisionadministrative: pays,
                                    valeur: this.varSuperficieCult
                                  });

                                  this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                                  //_____

                                  /*********************************INDICATEUR RENDEMENT*************************************************/
                                  //this.indRendement = this._indRendement(this.varQuantiteProd,this.varSuperficieCult);

                                  this._indRendement(this.varQuantiteProd,this.varSuperficieCult).subscribe(
                                    res =>{
                                      this.indRendement = res["result"];
                                      
                                      this.indIicateurItemForm.patchValue({
                                        campagne: 3,
                                        speculation: speculation,
                                        indicateur: 5,
                                        divisionadministrative: pays,
                                        valeur_gen: this.indRendement,
                                        valid_pfr: false,
                                        valid_pfp: false
                                      });
                                      this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();

                                      console.log(this.indIicateurItemForm.value);
                                      
                                      this.router.navigate(['/prodagric/indicitem']);
                                      
                                    },
                                    error => {
                                      console.log(error);
                                    }
                                  )
                                /*********************************Fin INDICATEUR RENDEMENT*************************************************/
                            },
                            error => {
                              console.log(error);
                            }
                          );
                          //////////////////////////////////////////////////
                      },
                      error => {
                        console.log(error);
                      }
                    );
                    //______________________________________________
                }
          },
          error => {
            console.log(error);
          }
        );

        break;

      case 6:
        //alert('6  case');
        //Qte producdion pout toutes les speculation_________________________
         this._getSpeculationList().subscribe(
          spec =>{
              let sepculations = spec;
              let i;
              for(i=0;i<sepculations.length;i++)
              {
                let speculation = sepculations[i]["id"];
              
                //______________________Variable Superficie_________________________
                this._varQuantiteProd(2024,speculation,pays).subscribe(
                  mouton =>{
                    //____
                      this.varQuantiteProd = mouton["data"][0]["quantiteProd"];

                      this.variableItemForm.patchValue({
                        campagne: 3,
                        speculation: speculation,
                        variable: 8,
                        divisionadministrative: pays,
                        valeur: this.varQuantiteProd
                      });

                      this._addProdagricVarItem(this.variableItemForm.value).subscribe();
                        /*********************************INDICATEUR QUANTITE PRODUCTION*************************************************/
                        this.indIicateurItemForm.patchValue({
                          campagne: 3,
                          speculation: speculation,
                          indicateur: 6,
                          divisionadministrative: pays,
                          valeur_gen: this.varQuantiteProd,
                          valid_pfr: false,
                          valid_pfp: false
                        });
                        this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();

                        //console.log(this.indIicateurItemForm.value);
                        
                        this.router.navigate(['/prodagric/indicitem']);

                     
                      /*********************************Fin QUANTITE PRODUCTION*************************************************/
                  },
                  error => {
                    console.log(error);
                  }
                );
                //______________________________________________
              }
        },
        error => {
          console.log(error);
        }
      );
        break;
    
       default:
           alert('Default case');
           break;
    }
 
     let campagne = this.generateurForm.value['campagne']; //recuperer l'id  de la campagne
     //let speculation = this.generateurForm.value['speculation'];
     let pays = this.generateurForm.value['pays'];
     
      
 
   }
   
   
  _varQuantiteProd(campagne:number, speculation:number, pays:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _varSuperficieCult(campagne:number, speculation:number, pays:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/varQuantiteProd?campagne='+campagne+'&speculation='+speculation+'&pays='+pays);
  }

  _indRendement(quantite:number, superficie:number){
    return this._http.get('http://127.0.0.1:8000/api/prodagric/indRendement?quantite='+quantite+'&superficie='+superficie);
  }

 

  _getProdagricIndItemList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricIndItemList');
  }

  _addProdagricVarItem(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/prodagric/prodagricVarItem/',data);
  }

 
  _getVarItemList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/prodagricVarItemList/');
  }

  _getSpeculationList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/speculation');
  }



   #____________________________
   uploadProdagricData()
   {
       //______________________Superficie pour toutes les speculation_________________________
       this._uploadProdagricData().subscribe(
        spec =>{
            let productionData = spec;
            let i;

            //console.log(productionData.length);
            //console.log(productionData);
            //for(i=0;i<productionData.length;i++)
            for(i=0;i<productionData.length;i++)
            {
              //console.log(productionData[i]["superficie_production_agricole"]);
              //______________________O5R004 SUPERFICIE id:52_________________________
              this.indIicateurItemForm.patchValue({
                  campagne: productionData[i]["annee_production_agricole"],
                  speculation: productionData[i]["produit_id"],
                  indicateur: 52,
                  divisionadministrative: productionData[i]["divisionadministrative_id"],
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
                    speculation: productionData[i]["produit_id"],
                    indicateur: 53,
                    divisionadministrative: productionData[i]["divisionadministrative_id"],
                    pays_id: productionData[i]["pays_production_agricole"],
                    valeur_gen: productionData[i]["rendement_production_agricole"],
                    valid_pfr: false,
                    valid_pfp: false,
                    public: true
                });
                this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();

              //______________________O5R006 PRODUCTION id: 54_________________________
              this.indIicateurItemForm.patchValue({
                  campagne: productionData[i]["annee_production_agricole"],
                  speculation: productionData[i]["produit_id"],
                  indicateur: 54,
                  divisionadministrative: productionData[i]["divisionadministrative_id"],
                  pays_id: productionData[i]["pays_production_agricole"],
                  valeur_gen: productionData[i]["quantite_production_agricole"],
                  valid_pfr: false,
                  valid_pfp: false,
                  public: true
              });
              this._addProdagricIndItem(this.indIicateurItemForm.value).subscribe();
              //______________________________________________
            }
      },
      error => {
        console.log(error);
      }
    );
   }
   
   _uploadProdagricData(): Observable<any> {
      let annee_debut = 2016;
      let annee_fin = 2017;
      let pays = 12;
     
      return this._http.get('http://127.0.0.1:8000/api/prodagric/getDataProductionAgricole?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays+'&');
    }

   

    _addProdagricIndItem(data: any): Observable<any> {
      return this._http.post('http://127.0.0.1:8000/api/prodagric/prodagricIndItem/',data);
    }




   addIndicVar(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/indicateurVariable/', data);
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
    return this._http.get('http://127.0.0.1:8000/api/indicateur/get_indicateur_variable/'+id);
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
    return this._http.delete(`http://127.0.0.1:8000/api/indicateur/indicateurVariable/${id}`);
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
      return this._http.get('http://127.0.0.1:8000/api/indicateur/get_variable_sousysteme/'+id);
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
    return this._http.get('http://127.0.0.1:8000/api/parametre/sous_systemes');
  }



  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
