import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { Layout1Component } from '../layout1/layout1/layout1.component';
import { Layout2Component } from '../layout2/layout2/layout2.component';

const routes: Routes = [
   
    {
      path: '',component:Layout2Component, loadChildren: () => import('./home2/home2.module').then(m => m.Home2Module)
    },

    /* {
      path: '',component:Layout1Component, loadChildren: () => import('./home1/home1.module').then(m => m.Home1Module)
    }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
