import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Estatus =
  | 'inscrito'
  | 'activo'
  | 'suspendido'
  | 'baja_empresa'
  | 'baja_programa'
  | 'reingreso'
  | 'egresado';

export interface Programa {
  id: number;
  nombre: string;
}

export interface Alumno {
  id: number;
  nombre: string;
  empresa: string;
  fechaIngreso: string;
}

export interface Inscripcion {
  id: number;
  alumnoId: number;
  programaId: number;
  estatus: Estatus;
}

export interface HistorialMovimiento {
  id: number;
  inscripcionId: number;
  estatusAnterior: Estatus | null;
  estatusNuevo: Estatus;
  fechaCambio: string;
  motivo: string;
}

@Injectable({ providedIn: 'root' })
export class AlumnosService {

  // ── Catálogos ──────────────────────────────────────────────
  readonly programas: Programa[] = [
    { id: 1, nombre: 'Lic. Negocios' },
    { id: 2, nombre: 'Lic. Logística' },
    { id: 3, nombre: 'Lic. Administración' },
    { id: 4, nombre: 'Bachillerato Ejecutivo' },
    { id: 5, nombre: 'Maestría en Dirección' },
  ];

  readonly estatusOpciones: Estatus[] = [
    'inscrito', 'activo', 'suspendido',
    'baja_empresa', 'baja_programa', 'reingreso', 'egresado',
  ];

  // ── Mock data ───────────────────────────────────────────────
  private alumnosData: Alumno[] = [
    { id: 1,  nombre: 'Luis Cruz',         empresa: 'Soriana', fechaIngreso: '2024-02-26' },
    { id: 2,  nombre: 'Andrés Ramírez',    empresa: 'Coppel',  fechaIngreso: '2022-10-04' },
    { id: 3,  nombre: 'Daniela Ortiz',     empresa: 'Soriana', fechaIngreso: '2017-10-02' },
    { id: 4,  nombre: 'Luis Reyes',        empresa: 'Soriana', fechaIngreso: '2015-06-06' },
    { id: 5,  nombre: 'Sofía Hernández',   empresa: 'Soriana', fechaIngreso: '2017-03-31' },
    { id: 6,  nombre: 'Paola Mendoza',     empresa: 'Bayer',   fechaIngreso: '2023-03-28' },
    { id: 7,  nombre: 'Gabriela Cruz',     empresa: 'Soriana', fechaIngreso: '2024-03-30' },
    { id: 8,  nombre: 'Gabriela Morales',  empresa: 'Soriana', fechaIngreso: '2018-07-05' },
    { id: 9,  nombre: 'Paola López',       empresa: 'Soriana', fechaIngreso: '2017-06-01' },
    { id: 10, nombre: 'Valeria Torres',    empresa: 'Soriana', fechaIngreso: '2020-11-04' },
    { id: 11, nombre: 'Paola Sánchez',     empresa: 'Alpura',  fechaIngreso: '2017-10-14' },
    { id: 12, nombre: 'José Gutiérrez',    empresa: 'Coppel',  fechaIngreso: '2022-05-06' },
  ];

  private inscripcionesData: Inscripcion[] = [
    { id: 1,  alumnoId: 1,  programaId: 1, estatus: 'activo' },
    { id: 2,  alumnoId: 2,  programaId: 3, estatus: 'suspendido' },
    { id: 3,  alumnoId: 3,  programaId: 2, estatus: 'egresado' },
    { id: 4,  alumnoId: 4,  programaId: 2, estatus: 'egresado' },
    { id: 5,  alumnoId: 5,  programaId: 2, estatus: 'baja_programa' },
    { id: 6,  alumnoId: 6,  programaId: 4, estatus: 'baja_programa' },
    { id: 7,  alumnoId: 7,  programaId: 1, estatus: 'baja_empresa' },
    { id: 8,  alumnoId: 8,  programaId: 1, estatus: 'baja_empresa' },
    { id: 9,  alumnoId: 9,  programaId: 2, estatus: 'egresado' },
    { id: 10, alumnoId: 10, programaId: 2, estatus: 'egresado' },
    { id: 11, alumnoId: 11, programaId: 3, estatus: 'reingreso' },
    { id: 12, alumnoId: 12, programaId: 5, estatus: 'suspendido' },
  ];

  private historialData: HistorialMovimiento[] = [
    { id: 1,  inscripcionId: 1, estatusAnterior: null,          estatusNuevo: 'inscrito',      fechaCambio: '2024-02-27', motivo: 'Inscripción inicial' },
    { id: 2,  inscripcionId: 1, estatusAnterior: 'inscrito',    estatusNuevo: 'activo',        fechaCambio: '2024-03-28', motivo: 'Inicio de actividades' },
    { id: 3,  inscripcionId: 2, estatusAnterior: null,          estatusNuevo: 'inscrito',      fechaCambio: '2022-10-05', motivo: 'Inscripción inicial' },
    { id: 4,  inscripcionId: 2, estatusAnterior: 'inscrito',    estatusNuevo: 'activo',        fechaCambio: '2022-11-03', motivo: 'Inicio de actividades' },
    { id: 5,  inscripcionId: 2, estatusAnterior: 'activo',      estatusNuevo: 'suspendido',    fechaCambio: '2023-11-25', motivo: 'Adeudo pendiente' },
    { id: 6,  inscripcionId: 7, estatusAnterior: null,          estatusNuevo: 'inscrito',      fechaCambio: '2024-03-31', motivo: 'Inscripción inicial' },
    { id: 7,  inscripcionId: 7, estatusAnterior: 'inscrito',    estatusNuevo: 'activo',        fechaCambio: '2024-04-29', motivo: 'Inicio de actividades' },
    { id: 8,  inscripcionId: 7, estatusAnterior: 'activo',      estatusNuevo: 'baja_empresa',  fechaCambio: '2025-04-26', motivo: 'Recorte de personal' },
    { id: 9,  inscripcionId: 5, estatusAnterior: null,          estatusNuevo: 'inscrito',      fechaCambio: '2017-04-01', motivo: 'Inscripción inicial' },
    { id: 10, inscripcionId: 5, estatusAnterior: 'inscrito',    estatusNuevo: 'activo',        fechaCambio: '2017-04-30', motivo: 'Inicio de actividades' },
    { id: 11, inscripcionId: 5, estatusAnterior: 'activo',      estatusNuevo: 'baja_programa', fechaCambio: '2017-09-08', motivo: 'Carga de trabajo elevada' },
    { id: 12, inscripcionId: 11, estatusAnterior: null,         estatusNuevo: 'inscrito',      fechaCambio: '2017-10-15', motivo: 'Inscripción inicial' },
    { id: 13, inscripcionId: 11, estatusAnterior: 'inscrito',   estatusNuevo: 'activo',        fechaCambio: '2017-11-13', motivo: 'Inicio de actividades' },
    { id: 14, inscripcionId: 11, estatusAnterior: 'activo',     estatusNuevo: 'baja_empresa',  fechaCambio: '2018-10-26', motivo: 'Término de contrato' },
    { id: 15, inscripcionId: 11, estatusAnterior: 'baja_empresa', estatusNuevo: 'reingreso',   fechaCambio: '2019-02-10', motivo: 'Recontratación' },
  ];

  private nextAlumnoId   = 13;
  private nextInscripcionId = 13;
  private nextHistorialId   = 16;

  // ── BehaviorSubjects ────────────────────────────────────────
  private alumnosSubject      = new BehaviorSubject<Alumno[]>(this.alumnosData);
  private inscripcionesSubject = new BehaviorSubject<Inscripcion[]>(this.inscripcionesData);
  private historialSubject    = new BehaviorSubject<HistorialMovimiento[]>(this.historialData);

  alumnos$      = this.alumnosSubject.asObservable();
  inscripciones$ = this.inscripcionesSubject.asObservable();
  historial$    = this.historialSubject.asObservable();

  // ── Helpers ─────────────────────────────────────────────────
  getProgramaNombre(id: number): string {
    return this.programas.find(p => p.id === id)?.nombre ?? '—';
  }

  getInscripcionPorAlumno(alumnoId: number): Inscripcion | undefined {
    return this.inscripcionesData.find(i => i.alumnoId === alumnoId);
  }

  getHistorialPorInscripcion(inscripcionId: number): HistorialMovimiento[] {
    return this.historialData.filter(h => h.inscripcionId === inscripcionId);
  }

  // ── Acciones ─────────────────────────────────────────────────
  registrarAlumno(data: Omit<Alumno, 'id'>, programaId: number): void {
    const nuevoAlumno: Alumno = { id: this.nextAlumnoId++, ...data };
    this.alumnosData = [...this.alumnosData, nuevoAlumno];
    this.alumnosSubject.next(this.alumnosData);

    const nuevaInscripcion: Inscripcion = {
      id: this.nextInscripcionId++,
      alumnoId: nuevoAlumno.id,
      programaId,
      estatus: 'inscrito',
    };
    this.inscripcionesData = [...this.inscripcionesData, nuevaInscripcion];
    this.inscripcionesSubject.next(this.inscripcionesData);

    const movimiento: HistorialMovimiento = {
      id: this.nextHistorialId++,
      inscripcionId: nuevaInscripcion.id,
      estatusAnterior: null,
      estatusNuevo: 'inscrito',
      fechaCambio: new Date().toISOString().split('T')[0],
      motivo: 'Inscripción inicial al programa',
    };
    this.historialData = [...this.historialData, movimiento];
    this.historialSubject.next(this.historialData);
  }

  cambiarEstatus(inscripcionId: number, nuevoEstatus: Estatus, motivo: string): void {
    const inscripcion = this.inscripcionesData.find(i => i.id === inscripcionId);
    if (!inscripcion) return;

    const estatusAnterior = inscripcion.estatus;

    this.inscripcionesData = this.inscripcionesData.map(i =>
      i.id === inscripcionId ? { ...i, estatus: nuevoEstatus } : i
    );
    this.inscripcionesSubject.next(this.inscripcionesData);

    const movimiento: HistorialMovimiento = {
      id: this.nextHistorialId++,
      inscripcionId,
      estatusAnterior,
      estatusNuevo: nuevoEstatus,
      fechaCambio: new Date().toISOString().split('T')[0],
      motivo,
    };
    this.historialData = [...this.historialData, movimiento];
    this.historialSubject.next(this.historialData);
  }
}