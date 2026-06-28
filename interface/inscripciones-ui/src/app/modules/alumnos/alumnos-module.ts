import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosRoutingModule } from './alumnos-routing-module';
import { AlumnosComponent } from './components/alumnos/alumnos';
import { ModalEstatusComponent } from './components/modal-estatus/modal-estatus';

@NgModule({
  declarations: [AlumnosComponent, ModalEstatusComponent],
  imports: [CommonModule, FormsModule, AlumnosRoutingModule]
})
export class AlumnosModule {}