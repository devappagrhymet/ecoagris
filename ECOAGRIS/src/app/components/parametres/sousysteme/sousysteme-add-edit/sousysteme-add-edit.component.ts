import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../common/header/header.component';

@Component({
  selector: 'app-sousysteme-add-edit',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
     MatSelectModule, MatNativeDateModule, ReactiveFormsModule, NgFor, HttpClientModule, HeaderComponent],
  templateUrl: './sousysteme-add-edit.component.html',
  styleUrl: './sousysteme-add-edit.component.scss'
})
export class SousystemeAddEditComponent {
    
  sousystemeForm: FormGroup;

  sousSystemes!: [];
  
  data: any;
  id:number;
  categories = new FormControl('');
  categoriesList: string[] = [
      'Design', 'UI/UX Design', 'Development', 'App', 'Develop', 'Angular'
  ];

  members = new FormControl('');
  membersList: string[] = [
      'Alvarado Turner', 'Evangelina Mcclain', 'Candice Munoz', 'Bernard Langley', 'Kristie Hall', 'Bolton Obrien'
  ];

  constructor(private _fb: FormBuilder,
              private _http: HttpClient,
              private snap: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService
             ){
    this.sousystemeForm = this._fb.group({
      codeSys: '',
      nomSys: '',
      nomSys_ang:''
    });
  }

  ngOnInit(): void {
    this.id = this.snap.snapshot.params['id'];
    this._getSousystemeList();
    /*===*/
    this._getSousystemeByID(this.id);
  }


  onFormSubmit() {

    //console.log('Formulaire : ',this.variableForm.value);

    if (this.sousystemeForm.valid) {
      if (this.id) {
        this.updateSousysteme(this.id,this.sousystemeForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Modification effectué avec success!', 'SUCCESS');
              this.router.navigate(['/sousysteme/list']);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.addSousysteme(this.sousystemeForm.value).subscribe({
          next: (val: any) => {
            this.router.navigate(['/sousysteme/list']);
            this.toastr.success('Enregistrement effectué avec success!', 'SUCCESS');
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  addSousysteme(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/parametre/sous_systemes/', data);
  }

  updateSousysteme(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/'+id+'/',data);
    //return this._http.put('http://127.0.0.1:8000/api/parametre/sous_systemes/${id}/',data);
  }

  _getSousystemeList()
  {
    this.getSousystemeList().subscribe(
      res =>{
        this.sousSystemes = res;
        //console.log(this.sousSystemes);
      },
      error => {
        console.log(error);
      }
    )
  }

  

  getSousystemeList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/sous_systemes');
  }

  addVariable(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/variable/', data);
  }

  updateVariable(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/variable/'+id+'/',data);
  }

  /*#######################################*/
  _getSousystemeByID(id:number) {

    if(id){
      this.getSousystemeByID(id).subscribe({
        next: (res) => {
          this.sousystemeForm.patchValue(res);
          //console.log(this.indicateurForm.value);
        },
        error: console.log,
      });
    }
  }

  getSousystemeByID(id:number): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/sous_systemes/'+id);
  }

 
}
