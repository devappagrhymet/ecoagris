import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule, NgFor, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {


    bookForm  : FormGroup;
    

    hide = true;

    constructor(
        public themeService: CustomizerSettingsService,
        private router : Router,
        private _fb: FormBuilder,
        private _http: HttpClient,

    ) {
        this.bookForm = this._fb.group({
            username: '',
            password: ''
            
          });
    }

    ngOnInit() {
        /*++++++++++++++*/
        localStorage.removeItem('id');
        localStorage.removeItem('nomUser');
        localStorage.removeItem('prenomUser');
        localStorage.removeItem('username');
        localStorage.removeItem('profil');
        localStorage.removeItem('profil_id');
        localStorage.removeItem('divisionadministrative');
        localStorage.removeItem('divadmin_id');
        localStorage.removeItem('photo_profil');
        localStorage.removeItem('pays_id');
        localStorage.removeItem('flag');
        /*++++++++++++++*/ /*++++++++++++++*/
    }

    onFormSubmit() {
       const username = this.bookForm.get('username').value;
       const password = this.bookForm.get('password').value;

       this.getUserList().subscribe(
         data =>{
           let users = data;
           /*===============*/
           let usr_msg:boolean=false;
           let i;
           for(i=0;i<users.length;i++)
           {
               

               if(users[i]['username'] == username && users[i]['password'] == password)
               {
                 
                //console.log("Username : "+username);
              // console.log("User "+i+" : "+users[i]['divisionadministrative']['image']);
 
                /*********** */
               // console.log("Password : "+password);
              //  console.log("Password "+i+" : "+users[i]['password']);
                /*+++++++*/
                    
                this.gotoHome();
                /*++++++++++++++*/
                localStorage.setItem('id', users[i]['id']);
                localStorage.setItem('nomUser', users[i]['nomUser']);
                localStorage.setItem('prenomUser', users[i]['prenomUser']);
                localStorage.setItem('username', users[i]['username']);
                localStorage.setItem('profil', users[i]['profil']['nomProfil']);
                localStorage.setItem('profil_id', users[i]['profil']['id']);
                localStorage.setItem('divisionadministrative', users[i]['divisionadministrative']['nomDivision']);
                localStorage.setItem('photo_profil', users[i]['photo_profil']);
                localStorage.setItem('pays_id', users[i]['divisionadministrative']['id']);
                localStorage.setItem('flag', users[i]['divisionadministrative']['image']);
                /*++++++++++++++*/ /*++++++++++++++*/
                let msg = 'Connexion au système par '+users[i]['prenomUser']+' '+users[i]['nomUser'];
                //this.logService.recordAction(users[i]['id'],msg);
                let connected = true;
                //this.userService.isConnected(users[i]['id'],connected)
                /************* */ /************** */
                usr_msg=false;
                
                break;
                   
               }
               else
               {
                 usr_msg=true;
               }
           }
   
           if(usr_msg==true)
           {
             alert("Nom d'utilisateur ou Mot de passe incorrecte !!!!");
           }
           /*===============*/
         },
         error => {
           console.log(error);
         }
       );
   
     }

    getUserList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/gestuser/users');
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    gotoHome(){
        this.router.navigate(['/home-dashboard']);
    }

}