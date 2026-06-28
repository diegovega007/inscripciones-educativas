# Sistema de Inscripciones Educativas

Proyecto full stack para el registro, seguimiento y análisis de alumnos inscritos en programas educativos corporativos.

---

## ¿Qué hace esta aplicación?

Permite gestionar el ciclo de vida de un alumno dentro de un programa académico: desde su inscripción inicial hasta su egreso, pasando por cambios de estatus como suspensiones, bajas o reingresos.

---

## Tecnologías utilizadas

- **Base de datos:** MariaDB
- **Análisis de datos:** Python 3 + Pandas + SQLAlchemy + Jupyter Notebook
- **Frontend:** Angular 22 con módulos tradicionales (`standalone: false`)

---

## Estructura del repositorio

```
/
├── db/
│   └── schema.sql              # DDL + DML + queries + stored procedure
├── analysis/
│   └── analysis.ipynb          # Notebook con análisis y gráficas
├── interface/
│   └── inscripciones-ui/       # Proyecto Angular
└── questions/
    └── respuestas.md           # Respuestas a preguntas conceptuales
```

---

## Parte 1 — Base de datos (MariaDB)

### Tablas

| Tabla | Descripción |
|---|---|
| `alumnos` | Datos del alumno y empresa de origen |
| `programas` | Catálogo de programas académicos |
| `inscripciones` | Relación alumno-programa con estatus actual |
| `historial_status` | Registro de cada cambio de estatus |

### Cómo ejecutar

1. Crear la base de datos en MariaDB:

```sql
CREATE DATABASE inscripciones_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Ejecutar el archivo SQL:

```bash
mariadb -u tu_usuario -p inscripciones_db < db/schema.sql
```

### Estatus disponibles

`inscrito` → `activo` → `suspendido` / `baja_empresa` / `baja_programa` / `reingreso` / `egresado`

### Stored Procedure

Registra un cambio de estatus validando que la inscripción exista:

```sql
CALL registrar_cambio_estatus(1, 'activo', 'Reincorporación tras acuerdo de pago');
```

---

## Parte 2 — Análisis de datos (Python)

### Requisitos
Nota: Se recomienda instalar las dependencias en un entorno virtual, por ejemplo venv o conda

```bash
pip install pandas matplotlib sqlalchemy pymysql jupyter
```

### Cómo ejecutar

```bash
cd analysis
jupyter notebook analysis.ipynb
```

El notebook incluye:
- Distribución de estatus actual por programa
- Evolución mensual de bajas vs. alumnos activos
- Tasa de activos por programa
- Gráficas de barras y líneas

---

## Parte 3 — Frontend (Angular)

### Requisitos previos

- Node.js v24 (probado con v24.15.0) o versiones LTS recientes (v20+)
- Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli
```

### Instalación

```bash
cd interface/inscripciones-ui
npm install
```

### Ejecutar en desarrollo

```bash
ng serve
```

Abrir en el navegador: **http://localhost:4200**

---

### Secciones de la aplicación

La interfaz es una **página única** sin navegación por rutas. Los tres módulos se muestran al mismo tiempo:

**Resumen** (parte superior)
Tarjetas con el conteo de alumnos por cada estatus. Se actualiza al registrar alumnos o cambiar estatus.

**Alumnos** (panel izquierdo)
Tabla con todos los alumnos inscritos. Permite filtrar por estatus y por programa. Al hacer clic en "Cambiar estatus" se abre un modal para registrar el nuevo estatus con su motivo.

**Registro** (panel derecho)
Formulario para dar de alta un nuevo alumno. Valida todos los campos antes de guardar.

---

### Arquitectura del frontend

```
interface/inscripciones-ui/src/app/
├── app.html                 # Layout de página única
├── app-module.ts            # Importa ResumenModule, AlumnosModule y RegistroModule
├── modules/
│   ├── alumnos/             # Tabla + modal de cambio de estatus
│   ├── registro/            # Formulario de alta
│   └── resumen/             # Tarjetas de conteo
└── services/
    └── alumnos.ts           # Estado compartido con BehaviorSubject
```

El estado de la aplicación se maneja en un único servicio (`AlumnosService`) usando `BehaviorSubject` de RxJS. Esto permite que cualquier cambio — ya sea un nuevo registro o un cambio de estatus — se refleje en los componentes suscritos sin recargar la página.

Los datos funcionan en memoria (mock data), lo que significa que al recargar el navegador vuelven al estado inicial.

---

## Notas

- El proyecto Angular usa **módulos tradicionales** con componentes declarados como `standalone: false`.
- Los feature modules se importan directamente en `AppModule`; no hay lazy loading activo en la pantalla principal.
- El formulario de registro usa **ReactiveFormsModule** con validaciones en todos los campos.
- Existen archivos de routing (`app-routing-module.ts` y `*-routing-module.ts`), pero la vista actual no los utiliza: todo se renderiza desde `app.html`.
