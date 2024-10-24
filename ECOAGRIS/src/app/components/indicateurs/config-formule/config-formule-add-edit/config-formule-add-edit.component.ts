import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StepperResponsiveComponent } from './stepper-responsive/stepper-responsive.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-config-formule-add-edit',
  standalone: true,
  imports: [MatCardModule, MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
            MatInputModule, MatSelectModule, StepperResponsiveComponent, MatButtonModule, NgFor, HttpClientModule,
            RouterLink, MatMenuModule, FormsModule, MatCheckboxModule ],
  templateUrl: './config-formule-add-edit.component.html',
  styleUrl: './config-formule-add-edit.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class ConfigFormuleAddEditComponent {
   configForm: FormGroup;
    
    sousSystemes!: [];

    indicateurs!: [];
    variables!: [];

    selectedValue;

    indicValue;

    formule;

    display:string ="";
    initial:string="";

    constructor(private _formBuilder: FormBuilder, private _http: HttpClient, private _fb:FormBuilder) {
      this.configForm = this._fb.group({
        id: '',
        formule: ''
      });
    }

  ngOnInit(): void {
    this._getSousystemeList();
  
  }

  save(){

    this.configForm.patchValue({
      id: this.indicValue,
      formule: this.display
    });

   // console.log('Formulaire : '+this.configForm.value);
  
   if (this.configForm.valid) {
        this.updateFormuleIndicateur(this.indicValue,this.configForm.value)
          .subscribe({
            next: (val: any) => {
              alert("Formule configurée avec succés");
            },
            error: (err: any) => {
              console.error(err);
            },
          });
    } 

  }

  updateFormuleIndicateur(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/config_formule/'+id+'/',data);
  }

  onChangeIndicateur(){
   
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

  onChange(){
    if(this.selectedValue){
      this._getIndicateurBySousysteme(this.selectedValue);
      this._getVariableList(this.selectedValue);
    }
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
  /****************************************************** */
  addIndicVar(event:MatCheckboxChange,variable:string) {
    this.initial = this.display;
    if(event.checked == true)
    {
      this.display = this.display+" "+variable; 
    }

    if(event.checked == false)
    {
      this.display = this.initial;
    }
   
    //console.log(event.checked);
  }
  addition():void{
     this.display = this.display+" + ";
  }

  soustraction():void{
     this.display = this.display+" - ";
  }

  multiplication():void{
     this.display = this.display+" * ";
  }

  division():void{
     this.display = this.display+" / ";
  }

  clear():void{
    this.display ="";
  }
  
  
}
