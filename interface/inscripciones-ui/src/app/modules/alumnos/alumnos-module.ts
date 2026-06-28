import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosComponent } from './components/alumnos/alumnos';
import { ModalEstatusComponent } from './components/modal-estatus/modal-estatus';

@NgModule({
  declarations: [AlumnosComponent, ModalEstatusComponent],
  imports: [CommonModule, FormsModule],
  exports: [AlumnosComponent]
})
export class AlumnosModule {}
