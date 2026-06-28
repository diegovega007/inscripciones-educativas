import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenRoutingModule } from './resumen-routing-module';
import { Resumen } from './components/resumen/resumen';

@NgModule({
  declarations: [Resumen],
  imports: [CommonModule, ResumenRoutingModule],
})
export class ResumenModule {}
