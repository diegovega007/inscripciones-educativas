import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { AlumnosService, Alumno, Inscripcion, Estatus } from '../../../../services/alumnos';

export interface FilaAlumno {
  alumno: Alumno;
  inscripcion: Inscripcion;
  programaNombre: string;
}

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.html',
  styleUrls: ['./alumnos.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {

  filas: FilaAlumno[] = [];
  filasFiltradas: FilaAlumno[] = [];

  filtroEstatus = '';
  filtroPrograma = '';

  alumnoSeleccionado: FilaAlumno | null = null;
  mostrarModal = false;

  estatusOpciones: Estatus[] = [];
  programas: { id: number; nombre: string }[] = [];

  private sub!: Subscription;

  constructor(
    private alumnosService: AlumnosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.estatusOpciones = this.alumnosService.estatusOpciones;
    this.programas       = this.alumnosService.programas;

    this.sub = combineLatest([
      this.alumnosService.alumnos$,
      this.alumnosService.inscripciones$
    ]).subscribe(([alumnos, inscripciones]) => {
      this.filas = alumnos.map(alumno => {
        const inscripcion = inscripciones.find(i => i.alumnoId === alumno.id)!;
        return {
          alumno,
          inscripcion,
          programaNombre: this.alumnosService.getProgramaNombre(inscripcion.programaId)
        };
      }).filter(f => f.inscripcion);

      this.aplicarFiltros();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  aplicarFiltros(): void {
    this.filasFiltradas = this.filas.filter(f => {
      const porEstatus  = this.filtroEstatus  ? f.inscripcion.estatus === this.filtroEstatus  : true;
      const porPrograma = this.filtroPrograma ? f.inscripcion.programaId === +this.filtroPrograma : true;
      return porEstatus && porPrograma;
    });
  }

  abrirModal(fila: FilaAlumno): void {
    this.alumnoSeleccionado = fila;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.alumnoSeleccionado = null;
  }

  onEstatusActualizado(): void {
    this.cerrarModal();
  }
}