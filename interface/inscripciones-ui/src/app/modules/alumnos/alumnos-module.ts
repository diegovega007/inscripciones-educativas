import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosRoutingModule } from './alumnos-routing-module';
import { Alumnos } from './components/alumnos/alumnos';
import { ModalEstatus } from './components/modal-estatus/modal-estatus';

@NgModule({
  declarations: [Alumnos, ModalEstatus],
  imports: [CommonModule, FormsModule, AlumnosRoutingModule]
})
export class AlumnosModule {}