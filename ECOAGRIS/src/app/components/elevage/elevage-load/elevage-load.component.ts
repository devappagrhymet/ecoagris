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
  selector: 'app-elevage-load',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule,
             DecimalPipe, HeaderComponent, AsyncPipe, MatProgressSpinnerModule, MatProgressBarModule, NgFor, MatAutocomplete, MatAutocompleteModule,ReactiveFormsModule, FormsModule, ],
  
  templateUrl: './elevage-load.component.html',
  styleUrl: './elevage-load.component.scss',
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
export class ElevageLoadComponent {

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
    this.indIicateurItemForm = this._fb.group({
      valeur_gen: '',
      speculation: '',
      indicateur: '',
      debut_campagne: '',
      fin_campagne:'',
      divisionadministrative: '',
      pays_id:'',
      valid_pfr:'',
      valid_pfp:'',
      public:''
    });
  }

  displayedColumns: string[] = [
    'id',
    'divadmin',
    'libDivadmin',
    'campagne',
    'quantite',
    'espece',
    'valeur',
    'unite',
  ];

  


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

  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();
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
  loadElevageData()
  {
      this.isLoading.next(true);

      switch (this.indicateur_params)
      { 
        /*--------VIande---------*/
        case  79:
          this._loadViandeData().subscribe(
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
                    //________________________________Variable quantite production viande ________________________
                    this.variableItemForm.patchValue({
                      valeur:      productionData[i]["quantite_viande"],
                      speculation: productionData[i]["id_produit"],
                      variable: 4,
                      debut_campagne: productionData[i]["debut_campagne"],
                      fin_campagne:   productionData[i]["fin_campagne"],
                      divisionadministrative: productionData[i]["id_division_administrative"],
                      pays_id: productionData[i]["pays_pproductionanimale"]
                    });
                    this._addElevageVarItem(this.variableItemForm.value).subscribe();
                    
                    //______________________O9R002 Production viande id:79_________________________
                    this.indIicateurItemForm.patchValue({
                      valeur_gen:  productionData[i]["quantite_viande"],
                      speculation: productionData[i]["id_produit"],
                      indicateur: 79,
                      debut_campagne: productionData[i]["debut_campagne"],
                      fin_campagne:   productionData[i]["fin_campagne"],
                      divisionadministrative: productionData[i]["id_division_administrative"],
                      pays_id: productionData[i]["pays_pproductionanimale"],
                      valid_pfr: false,
                      valid_pfp: false,
                      public: true
                    });
                    this._addElevageIndItem(this.indIicateurItemForm.value).subscribe();
    
                   
                    //______________________________________________
                   
                  }
                  this.setTimeOut();
    
                }
                else if(status === 200 && nbrExistData > 0)
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

          break;
        /*--------Produit laitier---------*/
        case  80:

          this._loadProduitLaitData().subscribe(
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
                      //________________________________Variable quantite production lait ________________________
                      this.variableItemForm.patchValue({
                        valeur:      productionData[i]["quantite_total_lait"],
                        speculation: productionData[i]["id_produit"],
                        variable: 5,
                        debut_campagne: productionData[i]["debut_campagne"],
                        fin_campagne:   productionData[i]["fin_campagne"],
                        divisionadministrative: productionData[i]["id_division_administrative"],
                        pays_id: productionData[i]["pays_productionlait"]
                      });
                      this._addElevageVarItem(this.variableItemForm.value).subscribe();
                      //______________________O9R012 Production lait id: 80_________________________
                      this.indIicateurItemForm.patchValue({
                        valeur_gen:  productionData[i]["quantite_total_lait"],
                        speculation: productionData[i]["id_produit"],
                        indicateur: 80,
                        debut_campagne: productionData[i]["debut_campagne"],
                        fin_campagne:   productionData[i]["fin_campagne"],
                        divisionadministrative: productionData[i]["id_division_administrative"],
                        pays_id: productionData[i]["pays_productionlait"],
                        valid_pfr: false,
                        valid_pfp: false,
                        public: true
                      });
                      this._addElevageIndItem(this.indIicateurItemForm.value).subscribe();
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
      
          break;
        /*--------Oeuf---------*/
        case  81:

              this._loadOeufData().subscribe(
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
                        //________________________________Variable quantite production oeuf ________________________
                        this.variableItemForm.patchValue({
                          valeur:      productionData[i]["quantite_total_oeuf"],
                          speculation: productionData[i]["id_produit"],
                          variable: 6,
                          debut_campagne: productionData[i]["debut_campagne"],
                          fin_campagne:   productionData[i]["fin_campagne"],
                          divisionadministrative: productionData[i]["id_division_administrative"],
                          pays_id: productionData[i]["pays_productionoeuf"]
                        });
                        this._addElevageVarItem(this.variableItemForm.value).subscribe();
                        //______________________O9S009 Production oeuf id: 81_________________________
                        this.indIicateurItemForm.patchValue({
                          valeur_gen:  productionData[i]["quantite_total_oeuf"],
                          speculation: productionData[i]["id_produit"],
                          indicateur: 81,
                          debut_campagne: productionData[i]["debut_campagne"],
                          fin_campagne:   productionData[i]["fin_campagne"],
                          divisionadministrative: productionData[i]["id_division_administrative"],
                          pays_id: productionData[i]["pays_productionoeuf"],
                          valid_pfr: false,
                          valid_pfp: false,
                          public: true
                        });
                        this._addElevageIndItem(this.indIicateurItemForm.value).subscribe();
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
        
            

          break;
        
         /*--------Cheptel---------*/
        case  85:

         this._loadCheptelData().subscribe(
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
                   //________________________________Variable effectif total ________________________
                   this.variableItemForm.patchValue({
                     valeur:      productionData[i]["effectif_total"],
                     speculation: productionData[i]["id_produit"],
                     variable: 10,
                     debut_campagne: productionData[i]["debut_campagne"],
                     fin_campagne:   productionData[i]["fin_campagne"],
                     divisionadministrative: productionData[i]["id_division_administrative"],
                     pays_id: productionData[i]["pays_elevage"]
                   });
                  
                   this._addElevageVarItem(this.variableItemForm.value).subscribe();
                   //______________________O9S009 Effectif total id: 85_________________________
                   this.indIicateurItemForm.patchValue({
                     valeur_gen:  productionData[i]["effectif_total"],
                     speculation: productionData[i]["id_produit"],
                     indicateur: 85,
                     debut_campagne: productionData[i]["debut_campagne"],
                     fin_campagne:   productionData[i]["fin_campagne"],
                     divisionadministrative: productionData[i]["id_division_administrative"],
                     pays_id: productionData[i]["pays_elevage"],
                     valid_pfr: false,
                     valid_pfp: false,
                     public: true
                   });

                   //console.log(this.variableItemForm.value);
                   this._addElevageIndItem(this.indIicateurItemForm.value).subscribe();
                   //______________________________________________
                 
                 }

                 this.setTimeOut();
   
               }
               else if(status === 200 && nbrExistData > 0)
               {
                 
                 this.toastr.info('Données cheptel pour  cette campagne existe deja dans la BD', 'INFO');
               }
               else
               {
                 
                 this.toastr.warning('Données cheptel non disponible à la source pour cette campagne', 'NOTIFICATION');
               }
           },
           error => {
             console.log(error);
           }
         );

          break;

        default:
          
          break;
      }
  }
   
  _loadViandeData(): Observable<any> {
      let annee_debut = this.debut_campagne;
      let annee_fin = this.fin_campagne;
      let pays = this.pays_params;
      let indicateur = this.indicateur_params

      let url;
      if(annee_debut && annee_fin && pays){
          url = this._http.get('http://154.127.90.218:8000/api/elevage/getDataProductionViande?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays+'&indicateur='+indicateur);
        }
      else
      { 
        url = "";
        this.toastr.error('Veillez renseigner les parametres', 'ALERT');
      }
      return url
  }

  _loadProduitLaitData(): Observable<any> {
    let annee_debut = this.debut_campagne;
    let annee_fin = this.fin_campagne;
    let pays = this.pays_params;
    let indicateur = this.indicateur_params

    let url;
    if(annee_debut && annee_fin && pays){
        url = this._http.get('http://154.127.90.218:8000/api/elevage/getDataProductionLaitiere?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays+'&indicateur='+indicateur);
      }
    else
    { 
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
  }


  _loadOeufData(): Observable<any> {
    let annee_debut = this.debut_campagne;
    let annee_fin = this.fin_campagne;
    let pays = this.pays_params;
    let indicateur = this.indicateur_params

    let url;
    if(annee_debut && annee_fin && pays){
        url = this._http.get('http://154.127.90.218:8000/api/elevage/getDataProductionOeuf?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays+'&indicateur='+indicateur);
      }
    else
    { 
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
  }


  _loadCheptelData(): Observable<any> {
    let annee_debut = this.debut_campagne;
    let annee_fin = this.fin_campagne;
    let pays = this.pays_params;
    let indicateur = this.indicateur_params

    let url;
    if(annee_debut && annee_fin && pays){
        url = this._http.get('http://154.127.90.218:8000/api/elevage/getDataCheptel?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays+'&indicateur='+indicateur);
      }
    else
    { 
      url = "";
      this.toastr.error('Veillez renseigner les parametres', 'ALERT');
    }
    return url
  }

   
  _addElevageVarItem(data: any): Observable<any> {
    return this._http.post('http://154.127.90.218:8000/api/elevage/elevageVarItem/',data);
   }

  _addElevageIndItem(data: any): Observable<any> {
      return this._http.post('http://154.127.90.218:8000/api/elevage/elevageIndItem/',data);
  }

  setTimeOut(){
    setTimeout(()=>{
      this._getData_Indicator_Pays(this.debut_campagne,this.fin_campagne,this.pays_params,this.indicateur_params);
      this.isLoading.next(false);
       this.toastr.success('Chargement effectué avec succés', 'SUCCESS');
    },30000);
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
    return this._http.get('http://154.127.90.218:8000/api/elevage/get_elevage_pays/'+params_debut+'-'+params_fin+'-'+params_pays+'-'+params_indicateur);
  }

   /*=====animation=======*/
   onListItemMouseEnter(index: number) {
      this.animationStates[index] = 'active';
    }

    onListItemMouseLeave(index: number) {
      this.animationStates[index] = 'default';
    }





}
