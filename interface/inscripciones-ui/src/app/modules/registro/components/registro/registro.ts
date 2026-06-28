import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../../../services/alumnos';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {

  form: FormGroup;
  programas: { id: number; nombre: string }[] = [];
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService
  ) {
    this.programas = this.alumnosService.programas;

    this.form = this.fb.group({
      nombre:       ['', [Validators.required, Validators.minLength(3)]],
      empresa:      ['', Validators.required],
      programaId:   ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  guardar(): void {
    this.mensajeExito = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, empresa, programaId, fechaIngreso } = this.form.value;

    this.alumnosService.registrarAlumno(
      { nombre, empresa, fechaIngreso },
      +programaId
    );

    this.mensajeExito = `Alumno "${nombre}" registrado exitosamente.`;
    this.form.reset();
  }
}
