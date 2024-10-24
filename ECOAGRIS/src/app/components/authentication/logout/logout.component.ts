import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {
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
        /*++++++++++++++*/ /*++++++++++++++*/
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

}