import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, RouterLinkActive, MatFormFieldModule, MatInputModule,  ReactiveFormsModule, HttpClientModule],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss'
})
export class CompteComponent {

  utilisateurForm: FormGroup;

  id:number;

  photo_profil;

  constructor(
      public themeService: CustomizerSettingsService,
      private snap: ActivatedRoute,
      private _http: HttpClient,
      private _fb: FormBuilder,
  ) {
    this.utilisateurForm = this._fb.group({
      id: '',
      nomUser: '',
      prenomUser:'',
      username:'',
      password:'',
      telephoneUser:'',
      emailUser:'',
      structureUser:'',
      departementUser:'',
      fonctionUser:'',
      statutUser:'',
      connecte:'',
      profil:'',
      divisionadministrative:'',
      photo_profil:''
    });
  }

  ngOnInit(): void {
    this.id = this.snap.snapshot.params['id'];
    this.photo_profil = localStorage.getItem('photo_profil');
    this._getUser(this.id);
  }

   /*#######################################*/
   _getUser(id:number) {

    if(id){
      this.getUser(id).subscribe({
        next: (res) => {
          
          this.utilisateurForm.patchValue(res);
  
          this.utilisateurForm.patchValue({
            profil: res.profil.id,
            divisionadministrative: res.divisionadministrative.id
          });
  
          //console.log(this.indicateurForm.value);
        },
        error: console.log,
      });
    }
  }

  getUser(id:number): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/gestuser/users/'+id);
  }

  onFormSubmit(){}

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }
}
