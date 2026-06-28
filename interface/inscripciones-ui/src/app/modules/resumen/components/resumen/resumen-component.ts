import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { AlumnosService, Inscripcion } from '../../../../services/alumnos';

interface TarjetaEstatus {
  label: string;
  estatus: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-resumen',
  standalone: false,
  templateUrl: './resumen.html',
  styleUrls: ['./resumen.css']
})
export class ResumenComponent implements OnInit, OnDestroy {

  tarjetas: TarjetaEstatus[] = [
    { label: 'Activos',       estatus: 'activo',        count: 0, color: '#2e7d32' },
    { label: 'Inscritos',     estatus: 'inscrito',      count: 0, color: '#1565c0' },
    { label: 'Suspendidos',   estatus: 'suspendido',    count: 0, color: '#e65100' },
    { label: 'Baja Empresa',  estatus: 'baja_empresa',  count: 0, color: '#b71c1c' },
    { label: 'Baja Programa', estatus: 'baja_programa', count: 0, color: '#880e4f' },
    { label: 'Reingreso',     estatus: 'reingreso',     count: 0, color: '#4527a0' },
    { label: 'Egresados',     estatus: 'egresado',      count: 0, color: '#00695c' },
  ];

  totalAlumnos = 0;
  private sub!: Subscription;

  constructor(
    private alumnosService: AlumnosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.alumnosService.alumnos$,
      this.alumnosService.inscripciones$
    ]).subscribe(([alumnos, inscripciones]) => {
      this.totalAlumnos = inscripciones.length;
      this.tarjetas = this.tarjetas.map(t => ({
        ...t,
        count: inscripciones.filter(i => i.estatus === t.estatus).length
      }));
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}