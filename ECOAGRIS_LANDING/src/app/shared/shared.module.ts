import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sharedlayout1Module } from './sharedlayout1/sharedlayout1.module';
import { Sharedlayout2Module } from './sharedlayout2/sharedlayout2.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    Sharedlayout1Module,
    Sharedlayout2Module
  ],
  exports: [
    Sharedlayout1Module,
    Sharedlayout2Module
  ]
})
export class SharedModule { }
