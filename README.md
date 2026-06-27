# Inscripciones Educativas

Sistema de gestión de inscripciones, estatus y historial académico de alumnos por programa.

---

## Requisitos

- MariaDB 10.5 o superior
- Cliente de terminal `mysql` (incluido con MariaDB)

---

## Ejecutar el script sql
Ejecuta db/schema.sql para crear las tablas, cargar los registros de prueba y registrar el stored procedure necesarios para operar el sistema.

### 1. Verificar que MariaDB está corriendo

```bash
mysql.server status
```

Si no está activo, inícialo:

```bash
mysql.server start
```

### 2. Crear la base de datos (solo la primera vez)

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS inscripciones_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 3. Ejecutar el script completo

```bash
mysql -u root -p inscripciones_db < db/schema.sql
```

> El script crea las tablas, inserta los datos de prueba, define las queries de análisis y registra el stored procedure `registrar_cambio_estatus`.

### 4. Verificar que todo cargó correctamente

```bash
mysql -u root -p inscripciones_db -e "SHOW TABLES;"
```

Deberías ver:

```
+----------------------------+
| Tables_in_inscripciones_db |
+----------------------------+
| alumnos                    |
| historial_status           |
| inscripciones              |
| programas                  |
+----------------------------+
```

---

## Usar el stored procedure

Para registrar un cambio de estatus de un alumno:

```sql
CALL registrar_cambio_estatus(id_inscripcion, 'nuevo_estatus', 'motivo del cambio');
```

Ejemplo:

```sql
CALL registrar_cambio_estatus(2, 'activo', 'Regularización de adeudo completada');
```

Estatus disponibles: `inscrito`, `activo`, `suspendido`, `baja_empresa`, `baja_programa`, `reingreso`, `egresado`.

---

