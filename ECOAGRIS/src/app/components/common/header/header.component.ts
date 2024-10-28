import { Component } from '@angular/core';
import { ToggleService } from './toggle.service';
import { NgClass, DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgClass, MatMenuModule, MatIconModule, MatButtonModule, DatePipe, HttpClientModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    isToggled = false;

    alpha;
    beta;

    id;
    nomUser;
    prenomUser;
    username;
    profil;
    profil_id;
    divisionadministrative;
    photo_profil;
    pays_id;
    flag;

    divadmin$: any;
    
    currentDate: Date;
    
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private _http: HttpClient,
    ) 
    {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.currentDate = new Date();
    }

    ngAfterViewInit() {
       
    }

   

    ngOnInit() {
        /*++++++++++++++*/
        this.id = localStorage.getItem('id');
        this.nomUser = localStorage.getItem('nomUser');
        this.prenomUser = localStorage.getItem('prenomUser');
        this.username = localStorage.getItem('username');
        this.profil = localStorage.getItem('profil');
        this.profil_id = localStorage.getItem('profil_id');
        this.divisionadministrative = localStorage.getItem('divisionadministrative');
        this.photo_profil = localStorage.getItem('photo_profil');
        this.pays_id = localStorage.getItem('pays_id');
        this.flag = localStorage.getItem('flag');
        /*++++++++++++++*/ /*++++++++++++++*/
    }

    /* reloadPage() {
        location.reload();
     } */
    

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}