import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Feathericon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

//Carousel
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Swiper
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';

// Component
import { ServicesComponent } from './services/services.component';
import { FeaturesComponent } from './features/features.component';
import { ClientsComponent } from './clients/clients.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ServicesComponent,
    FeaturesComponent,
    ClientsComponent,
    PortfolioComponent,
    PricingComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    CountUpModule,
    CarouselModule,
    SlickCarouselModule
  ],
  exports: [
    ServicesComponent,
    FeaturesComponent,
    ClientsComponent,
    PortfolioComponent,
    PricingComponent,
    ContactComponent
  ],
})
export class Sharedlayout1Module { }
