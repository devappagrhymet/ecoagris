import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { Home2RoutingModule } from './home2-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


// Swiper
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CarouselModule } from 'ngx-bootstrap/carousel';

// Component
import { Layouttwo1Component } from './layouttwo1/layouttwo1.component';
import { Layouttwo2Component } from './layouttwo2/layouttwo2.component';
import { Layouttwo3Component } from './layouttwo3/layouttwo3.component';
import { Layouttwo4Component } from './layouttwo4/layouttwo4.component';
import { Layouttwo5Component } from './layouttwo5/layouttwo5.component';
import { Layouttwo6Component } from './layouttwo6/layouttwo6.component';

@NgModule({
  declarations: [
    Layouttwo1Component,
    Layouttwo2Component,
    Layouttwo3Component,
    Layouttwo4Component,
    Layouttwo5Component,
    Layouttwo6Component
  ],
  imports: [
    CommonModule,
    Home2RoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
    CarouselModule.forRoot(),
    SlickCarouselModule
  ]
})
export class Home2Module { }
