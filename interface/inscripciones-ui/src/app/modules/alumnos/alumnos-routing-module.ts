import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';

const routes: Routes = [
  { path: '', component: Alumnos }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule {}
