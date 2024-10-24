import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Layout1Module } from './layout1/layout1.module';
import { Layout2Module } from './layout2/layout2.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    Layout1Module,
    Layout2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
