import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { Home1Module } from './home1/home1.module';
import { Home2Module } from './home2/home2.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    Home1Module,
    Home2Module
  ]
})
export class PagesModule { }
