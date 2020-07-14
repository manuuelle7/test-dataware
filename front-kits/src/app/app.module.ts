import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgProgressModule} from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/core';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgProgressModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ResourceModule.forRoot()
  ],
  exports: [ReactiveFormsModule, MDBBootstrapModule, AppRoutingModule],
  providers: [
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule{}
