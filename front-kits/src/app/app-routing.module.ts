import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'kits',
    data: {
      pageTitle: 'Kits'
    },
    loadChildren: () => import('./kits.module/kits.module').then(m => m.KitsModule)
  },

  {path: '', redirectTo: '/kits', pathMatch: 'full'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
