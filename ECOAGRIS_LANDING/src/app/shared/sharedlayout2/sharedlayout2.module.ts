import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Swiper
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AccordionModule } from 'ngx-bootstrap/accordion';

// component
import { Service2Component } from './service2/service2.component';
import { Feature2Component } from './feature2/feature2.component';
import { Clients2Component } from './clients2/clients2.component';
import { Portfolio2Component } from './portfolio2/portfolio2.component';
import { Pricing2Component } from './pricing2/pricing2.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Service2Component,
    Feature2Component,
    Clients2Component,
    Portfolio2Component,
    Pricing2Component
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    AccordionModule.forRoot(),
    SlickCarouselModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    Service2Component,
    Feature2Component,
    Clients2Component,
    Portfolio2Component,
    Pricing2Component
  ]
})
export class Sharedlayout2Module { }
