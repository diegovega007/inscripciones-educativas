--Inicialización de la base de datos --------------------------------------------------------------

--Creación de la base de datos 
CREATE DATABASE IF NOT EXISTS inscripciones_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

--Uso de la base de datos
USE inscripciones_db;

----------------------------------------------------------------
--Creación de las tablas--
----------------------------------------------------------------

--Creación de la tabla alumnos
CREATE TABLE IF NOT EXISTS alumnos (
    id INT  NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100)  NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Creación de tabla programas
CREATE TABLE IF NOT EXISTS programas (
    id INT  NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100)  NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Creación de tabla inscripciones
CREATE TABLE IF NOT EXISTS inscripciones (
    id INT  NOT NULL AUTO_INCREMENT,
    id_alumno INT NOT NULL,
    id_programa INT NOT NULL,
    estatus ENUM(
        'inscrito',
        'activo',
        'suspendido',
        'baja_empresa',
        'baja_programa',
        'reingreso',
        'egresado'
    ) NOT NULL DEFAULT 'inscrito',
    PRIMARY KEY (id)
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id),
    FOREIGN KEY (id_programa) REFERENCES programas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabla de historial_status
CREATE TABLE IF NOT EXISTS historial_status (
    id INT  NOT NULL AUTO_INCREMENT,
    id_inscripcion INT NOT NULL,
    estatus_anterior ENUM(
        'inscrito',
        'activo',
        'suspendido',
        'baja_empresa',
        'baja_programa',
        'reingreso',
        'egresado'
    ) NULL COMMENT 'NULL en el primer registro (alta inicial)',
    estatus_nuevo   ENUM(
        'inscrito',
        'activo',
        'suspendido',
        'baja_empresa',
        'baja_programa',
        'reingreso',
        'egresado'
    ) NOT NULL,
    fecha_cambio DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (id_inscripcion) REFERENCES inscripciones(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


