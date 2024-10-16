import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'module',
    loadChildren: () =>import('./modules/modules.module').then((m) => m.ModulesModule),
  },
  {
    path: '',
    redirectTo: 'module',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
