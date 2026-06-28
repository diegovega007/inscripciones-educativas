import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'resumen',
    pathMatch: 'full'
  },
  {
    path: 'resumen',
    loadChildren: () =>
      import('./modules/resumen/resumen-module').then(m => m.ResumenModule)
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/alumnos/alumnos-module').then(m => m.AlumnosModule)
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modules/registro/registro-module').then(m => m.RegistroModule)
  },
  {
    path: '**',
    redirectTo: 'resumen'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}