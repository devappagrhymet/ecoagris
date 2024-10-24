import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layouttwo5Component } from './pages/home2/layouttwo5/layouttwo5.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
