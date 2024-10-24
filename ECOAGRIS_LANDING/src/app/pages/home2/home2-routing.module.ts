import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { Layouttwo1Component } from './layouttwo1/layouttwo1.component';
import { Layouttwo2Component } from './layouttwo2/layouttwo2.component';
import { Layouttwo3Component } from './layouttwo3/layouttwo3.component';
import { Layouttwo4Component } from './layouttwo4/layouttwo4.component';
import { Layouttwo5Component } from './layouttwo5/layouttwo5.component';
import { Layouttwo6Component } from './layouttwo6/layouttwo6.component';

const routes: Routes = [
  {
    path: '',
    component: Layouttwo5Component
  },
  {
    path: 'layout-two-1',
    component: Layouttwo1Component,
  },
  {
    path: 'layout-two-2',
    component: Layouttwo2Component,
  },
  {
    path: 'layout-two-3',
    component: Layouttwo3Component,
  },
  {
    path: 'layout-two-4',
    component: Layouttwo4Component,
  },
  {
    path: 'layout-two-6',
    component: Layouttwo6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Home2RoutingModule { }
