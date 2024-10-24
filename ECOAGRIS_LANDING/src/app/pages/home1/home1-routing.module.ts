import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { Layoutone1Component } from './layoutone1/layoutone1.component';
import { Layoutone2Component } from './layoutone2/layoutone2.component';
import { Layoutone3Component } from './layoutone3/layoutone3.component';
import { Layoutone4Component } from './layoutone4/layoutone4.component';
import { Layoutone5Component } from './layoutone5/layoutone5.component';
import { Layoutone6Component } from './layoutone6/layoutone6.component';

const routes: Routes = [
  {
    path: 'layout-one-1',
    component: Layoutone1Component
  },
  {
    path: 'layout-one-2',
    component: Layoutone2Component
  },
  {
    path: 'layout-one-3',
    component: Layoutone3Component
  },
  {
    path: 'layout-one-4',
    component: Layoutone4Component
  },
  {
    path: 'layout-one-5',
    component: Layoutone5Component
  },
  {
    path: 'layout-one-6',
    component: Layoutone6Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Home1RoutingModule { }
