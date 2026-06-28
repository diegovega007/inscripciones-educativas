import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing-module';
import { Registro } from './components/registro/registro';

@NgModule({
  declarations: [Registro],
  imports: [CommonModule, RegistroRoutingModule],
})
export class RegistroModule {}
