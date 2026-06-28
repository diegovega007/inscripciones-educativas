import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing-module';
import { Registro } from './components/registro/registro';

@NgModule({
  declarations: [Registro],
  imports: [CommonModule, ReactiveFormsModule, RegistroRoutingModule]
})
export class RegistroModule {}
