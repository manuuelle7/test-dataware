import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { CommonModule } from '@angular/common';
import { AngularImageViewerModule} from 'angular-x-image-viewer';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/core';
import { KitsService } from './kits.service';
import { KitsRouting } from './kits.routing';
import { KitsListaComponent } from './kits-lista.component/kits-lista.component';
import { KitsDetalleComponent } from './kits-detalle.component/kits-detalle.component';
@NgModule({
  declarations: [
     KitsListaComponent,
     KitsDetalleComponent
  ],
  imports: [
    CommonModule,
    AngularImageViewerModule,
    KitsRouting,
    MDBBootstrapModule,
    FormsModule,
    NgProgressModule,
    ReactiveFormsModule,
    HttpClientModule,
    ResourceModule

  ],
  providers: [
     KitsService
  ]
})

export class KitsModule { }
