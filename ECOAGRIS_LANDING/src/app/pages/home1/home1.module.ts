import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { Home1RoutingModule } from './home1-routing.module';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Swiper
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';

// component
import { Layoutone1Component } from './layoutone1/layoutone1.component';
import { Layoutone2Component } from './layoutone2/layoutone2.component';
import { Layoutone3Component } from './layoutone3/layoutone3.component';
import { Layoutone4Component } from './layoutone4/layoutone4.component';
import { Layoutone5Component } from './layoutone5/layoutone5.component';
import { Layoutone6Component } from './layoutone6/layoutone6.component';

@NgModule({
  declarations: [
    Layoutone1Component,
    Layoutone2Component,
    Layoutone3Component,
    Layoutone4Component,
    Layoutone5Component,
    Layoutone6Component
  ],
  imports: [
    CommonModule,
    Home1RoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
    CarouselModule,
    ModalModule,
    SlickCarouselModule
  ]
})
export class Home1Module { }
