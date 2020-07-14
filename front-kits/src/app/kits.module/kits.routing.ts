import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KitsListaComponent } from './kits-lista.component/kits-lista.component';



const routes: Routes = [
    {
        path: '',
         component: KitsListaComponent,
        data: {
          pageTitle: 'KITS'
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRouting { }
