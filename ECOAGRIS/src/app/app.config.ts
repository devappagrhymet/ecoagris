import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { IndicateurService } from './_services/indicateur.service'


export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
                provideRouter(routes), 
                provideClientHydration(), 
                provideAnimationsAsync(),
                provideAnimations(),
                provideToastr(
                    {
                        closeButton:true,
                        positionClass:'toast-top-right',
                        timeOut:5000,
                        preventDuplicates:true,
                        progressBar: true,
                        progressAnimation: 'increasing'
                    }
                ),
                IndicateurService,
                
            ]
};