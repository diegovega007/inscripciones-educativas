import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenComponent } from './components/resumen/resumen-component';

const routes: Routes = [
  { path: '', component: ResumenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenRoutingModule {}