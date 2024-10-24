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
import { MatAutocompleteModule } from '@angular/material/autocomplete';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-config-ind-var',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, 
            MatAutocompleteModule, MatChipsModule],
  templateUrl: './config-ind-var.component.html',
  styleUrl: './config-ind-var.component.scss',
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
export class ConfigIndVarComponent {

  variableForm: FormGroup;
  indicVarForm: FormGroup;
  
  animationStates: { [key: number]: 'default' | 'active' } = {};

sousSystemes!: [];

indicateurs!: [];

variables!: [];

systeme:number;

selectedValue;

indicValue;

myControl = new FormControl('');
options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
      private _fb:FormBuilder,
  ) {
    this.variableForm = this._fb.group({
      indicateur: '',
      variable: ''
    });

    this.indicVarForm = this._fb.group({
      indicateur: '',
      variable: ''
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

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
     
      this._getSousystemeList();
      this._getVariableList();
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }
   }

   onFormSubmit()
   {
      // console.log('Data : '+this.variableForm.value['variable'].length);
      let i;
      for(i=0;i<this.variableForm.value['variable'].length;i++)
      {
        this.indicVarForm.patchValue({
          indicateur: this.variableForm.value['indicateur'],
          variable: this.variableForm.value['variable'][i]
        });
        
        this.addIndicVar(this.indicVarForm.value).subscribe({
          next: (val: any) => {
            this._getIndicVar(this.indicValue);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      //this._getIndicVar();
      alert("Indicateur added successfully!");
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
     // this._getVariableList(this.selectedValue);
      this._getIndicateurBySousysteme(this.selectedValue);
    }
  }

  onChangeIndicateur(){
    if(this.indicValue){
      this._getIndicVar(this.indicValue);
    }
  }

  _getVariableList() {
      this.getVariableList().subscribe(
        res => {

          this.variables = res;
        
        },
        error => {
          console.log(error);
        }
      );
  }

  getVariableList(): Observable<any> {
      //return this._http.get('http://127.0.0.1:8000/api/indicateur/get_variable_sousysteme/'+id);
      return this._http.get('http://127.0.0.1:8000/api/indicateur/variable/');
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
