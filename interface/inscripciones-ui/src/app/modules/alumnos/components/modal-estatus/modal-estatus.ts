import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlumnosService, Estatus } from '../../../../services/alumnos';
import { FilaAlumno } from '../alumnos/alumnos';

@Component({
  selector: 'app-modal-estatus',
  standalone: false,
  templateUrl: './modal-estatus.html',
  styleUrls: ['./modal-estatus.css']
})
export class ModalEstatusComponent {

  @Input()  fila!: FilaAlumno;
  @Output() cerrar     = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<void>();

  nuevoEstatus: Estatus | '' = '';
  motivo = '';
  error  = '';

  estatusOpciones: Estatus[] = [];

  constructor(private alumnosService: AlumnosService) {
    this.estatusOpciones = this.alumnosService.estatusOpciones;
  }

  guardar(): void {
    if (!this.nuevoEstatus) {
      this.error = 'Selecciona un estatus.';
      return;
    }
    if (!this.motivo.trim()) {
      this.error = 'El motivo es obligatorio.';
      return;
    }

    this.alumnosService.cambiarEstatus(
      this.fila.inscripcion.id,
      this.nuevoEstatus as Estatus,
      this.motivo.trim()
    );

    this.actualizado.emit();
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}
