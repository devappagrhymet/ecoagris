import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollspyDirective } from '../scrollspy.directive2';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

//Bootstrap Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Component
import { Layout2Component } from './layout2/layout2.component';
import { Header2Component } from './header2/header2.component';
import { Footer2Component } from './footer2/footer2.component';




@NgModule({
  declarations: [
    Layout2Component,
    Header2Component,
    Footer2Component,
    ScrollspyDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollToModule.forRoot(),
    FeatherModule.pick(allIcons),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Layout2Module { }
