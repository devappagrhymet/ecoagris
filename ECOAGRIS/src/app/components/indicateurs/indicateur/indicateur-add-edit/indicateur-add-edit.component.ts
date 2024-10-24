import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-indicateur-add-edit',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, 
            MatDatepickerModule, MatSelectModule, MatNativeDateModule, ReactiveFormsModule, NgFor, HttpClientModule, MatRadioModule ],
  templateUrl: './indicateur-add-edit.component.html',
  styleUrl: './indicateur-add-edit.component.scss'
})
export class IndicateurAddEditComponent {
  
  indicateurForm: FormGroup;

  sousSystemes!: [];
  frequences!: [];
  unites!: [];
  niveaux!: [];
  
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
             ){
    this.indicateurForm = this._fb.group({
      code: '',
      libelle: '',
      libelle_ang:'',
      responsable_collecte:'',
      description:'',
      description_ang:'',
      indicateur_CRA:'',
      composite:'',
      statut:'',
      calcule:'',
      frequence:'',
      unite:'',
      niveau:'',
      sousysteme:''
    });
  }

  ngOnInit(): void {
    this.id = this.snap.snapshot.params['id'];
    this._getFrequenceList();
    this._getSousystemeList();
    this._getNiveauList();
    this._getUniteList();
    /*===*/

    this._getIndicateurList(this.id);
    
  }


  onFormSubmit() {

    //console.log('Formulaire : ',this.indicateurForm.value);

    if (this.indicateurForm.valid) {
      if (this.data) {
        this.updateIndicateur(this.data.id, this.indicateurForm.value)
          .subscribe({
            next: (val: any) => {
             alert(" Modification effectué avec success! ");
             this.router.navigate(['/indicateur/list']);
             
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.addIndicateur(this.indicateurForm.value).subscribe({
          next: (val: any) => {
            this.router.navigate(['/indicateur/list']);
            alert(" Enregistrement effectué avec success! ");
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
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

  _getFrequenceList()
  {
    this.getFrequenceList().subscribe(
      res =>{
        this.frequences = res;
        //console.log(this.frequences);
      },
      error => {
        console.log(error);
      }
    )
  }


  _getUniteList()
  {
    this.getUniteList().subscribe(
      res =>{
        this.unites = res;
        //console.log(this.unites);
      },
      error => {
        console.log(error);
      }
    )
  }

  _getNiveauList()
  {
    this.getNiveauList().subscribe(
      res =>{
        this.niveaux = res;
        //console.log(this.unites);
      },
      error => {
        console.log(error);
      }
    )
  }


  getSousystemeList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/sous_systemes');
  }

  getFrequenceList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/frequences');
  }

  getNiveauList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/niveaux');
  }

  getUniteList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/parametre/unites');
  }

  addIndicateur(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/indicateur/indicateur/',data);
  }

  updateIndicateur(id: number, data: any): Observable<any> {
    return this._http.put('http://127.0.0.1:8000/api/indicateur/indicateur/'+id+'/',data);
    
  }

  /*#######################################*/
  _getIndicateurList(id:number) {

    if(id){
      this.getIndicateurList(id).subscribe({
        next: (res) => {
          console.log(res.calcule);
          let mouton;
          if(res.calcule == true)
          {
            mouton = true;
          }else{mouton = false;}
          
          this.indicateurForm.patchValue(res);
  
          this.indicateurForm.patchValue({
            frequence: res.frequence.id,
            unite: res.unite.id,
            niveau: res.niveau.id,
            sousysteme: res.sousysteme.id,
            calcule:false
          });
  
          //console.log(this.indicateurForm.value);
        },
        error: console.log,
      });
    }
  }

  getIndicateurList(id:number): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/indicateur/indicateurList/'+id);
  }

}
