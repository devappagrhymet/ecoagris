import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollspyDirective } from '../scrollspy.directive';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Component
import { Layout1Component } from './layout1/layout1.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    Layout1Component,
    HeaderComponent,
    FooterComponent,
    ScrollspyDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollToModule.forRoot(),
    FeatherModule.pick(allIcons)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Layout1Module { }
