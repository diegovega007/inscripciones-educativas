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
    PRIMARY KEY (id),
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
    PRIMARY KEY (id),
    FOREIGN KEY (id_inscripcion) REFERENCES inscripciones(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

----------------------------------------------------------------
--Inserción de registros de prueba--
----------------------------------------------------------------

--Programas
INSERT INTO programas (id, nombre, descripcion) VALUES
    (1, 'Lic. Negocios', 'Licenciatura enfocada en gestión y desarrollo de negocios corporativos'),
    (2, 'Lic. Logística', 'Licenciatura en administración de cadenas de suministro y logística empresarial'),
    (3, 'Lic. Administración','Licenciatura en administración de organizaciones públicas y privadas'),
    (4, 'Bachillerato Ejecutivo','Bachillerato intensivo para adultos trabajadores con horarios flexibles'),
    (5, 'Maestría en Dirección', 'Posgrado orientado al liderazgo estratégico y dirección de alto nivel');

--Alumnos
INSERT INTO alumnos (id, nombre, empresa, fecha_ingreso) VALUES
    (1, 'Luis Cruz','Soriana', '2024-02-26'),
    (2, 'Andrés Ramírez', 'Coppel', '2022-10-04'),
    (3, 'Daniela Ortiz','Soriana', '2017-10-02'),
    (4, 'Luis Reyes','Soriana', '2015-06-06'),
    (5, 'Sofía Hernández','Soriana', '2017-03-31'),
    (6, 'Paola Mendoza','Bayer', '2023-03-28'),
    (7, 'Gabriela Cruz','Soriana', '2024-03-30'),
    (8, 'Gabriela Morales','Soriana', '2018-07-05'),
    (9, 'Paola López','Soriana', '2017-06-01'),
    (10, 'Valeria Torres','Soriana', '2020-11-04'),
    (11, 'Paola Sánchez', 'Alpura', '2017-10-14'),
    (12, 'José Gutiérrez', 'Coppel', '2022-05-06');

--Inscripciones
INSERT INTO inscripciones (id, id_alumno, id_programa, estatus) VALUES
    (1,  1,  1, 'activo'),
    (2,  2,  3, 'suspendido'),
    (3,  3,  2, 'egresado'),
    (4,  4,  2, 'egresado'),
    (5,  5,  2, 'baja_programa'),
    (6,  6,  4, 'baja_programa'),
    (7,  7,  1, 'baja_empresa'),
    (8,  8,  1, 'baja_empresa'),
    (9,  9,  2, 'egresado'),
    (10, 10, 2, 'egresado'),
    (11, 11, 3, 'reingreso'),
    (12, 12, 5, 'suspendido');

--Historial de status
INSERT INTO historial_status (id, id_inscripcion, estatus_anterior, estatus_nuevo, fecha_cambio, motivo) VALUES
    (1,  1,  NULL, 'inscrito', '2024-02-27', 'Inscripción inicial al programa'),
    (2,  1,  'inscrito', 'activo', '2024-03-28', 'Inicio de actividades académicas'),
    (3,  2,  NULL, 'inscrito', '2022-10-05', 'Inscripción inicial al programa'),
    (4,  2,  'inscrito', 'activo', '2022-11-03', 'Inicio de actividades académicas'),
    (5,  2,  'activo', 'suspendido', '2023-11-25', 'Adeudo pendiente de pago'),
    (6,  3,  NULL, 'inscrito', '2017-10-03', 'Inscripción inicial al programa'),
    (7,  3,  'inscrito', 'activo', '2017-11-01', 'Inicio de actividades académicas'),
    (8,  3,  'activo', 'egresado', '2018-01-12', 'Cumplimiento de créditos requeridos'),
    (9,  5,  NULL, 'inscrito', '2017-04-01', 'Inscripción inicial al programa'),
    (10, 5,  'inscrito', 'activo', '2017-04-30', 'Inicio de actividades académicas'),
    (11, 5,  'activo', 'baja_programa', '2017-09-08', 'Carga de trabajo elevada en empresa'),
    (12, 6,  NULL, 'inscrito', '2023-03-29', 'Inscripción inicial al programa'),
    (13, 6,  'inscrito', 'activo', '2023-04-27', 'Inicio de actividades académicas'),
    (14, 6,  'activo', 'baja_programa', '2024-03-31', 'Motivos personales'),
    (15, 7,  NULL, 'inscrito', '2024-03-31', 'Inscripción inicial al programa'),
    (16, 7,  'inscrito', 'activo', '2024-04-29', 'Inicio de actividades académicas'),
    (17, 7,  'activo', 'baja_empresa', '2025-04-26', 'Recorte de personal en Soriana'),
    (18, 8,  NULL, 'inscrito', '2018-07-06', 'Inscripción inicial al programa'),
    (19, 8,  'inscrito', 'activo', '2018-08-04', 'Inicio de actividades académicas'),
    (20, 8,  'activo', 'baja_empresa', '2018-10-19', 'Reestructura organizacional'),
    (21, 11, NULL, 'inscrito', '2017-10-15', 'Inscripción inicial al programa'),
    (22, 11, 'inscrito', 'activo', '2017-11-13', 'Inicio de actividades académicas'),
    (23, 11, 'activo', 'baja_empresa', '2018-10-26', 'Término de contrato con Alpura'),
    (24, 11, 'baja_empresa','reingreso', '2019-02-10', 'Recontratación en empresa convenio'),
    (25, 12, NULL, 'inscrito', '2022-05-07', 'Inscripción inicial al programa'),
    (26, 12, 'inscrito', 'activo', '2022-06-05', 'Inicio de actividades académicas'),
    (27, 12, 'activo', 'suspendido',  '2023-07-02', 'Pausa temporal por situación laboral');

----------------------------------------------------------------
-- Stored Procedure --
----------------------------------------------------------------

-- SP: registrar_cambio_estatus
-- Recibe el id de una inscripción, el nuevo estatus y el motivo.
-- Valida que la inscripción exista, obtiene el estatus actual,
-- actualiza inscripciones e inserta el movimiento en historial_status.
-- Si la inscripción no existe, señaliza un error y no hace nada.

DELIMITER $$

CREATE PROCEDURE registrar_cambio_estatus (
    IN  p_id_inscripcion  INT,
    IN  p_nuevo_estatus   ENUM('inscrito','activo','suspendido','baja_empresa','baja_programa','reingreso','egresado'),
    IN  p_motivo          VARCHAR(255)
)
BEGIN
    DECLARE v_estatus_actual  VARCHAR(20);
    DECLARE v_id_alumno       INT;
    DECLARE v_nombre_alumno   VARCHAR(100);

    -- Verificar que la inscripción existe y obtener datos relacionados
    SELECT
        i.estatus,
        a.id,
        a.nombre
    INTO
        v_estatus_actual,
        v_id_alumno,
        v_nombre_alumno
    FROM inscripciones i
    JOIN alumnos a ON a.id = i.id_alumno
    WHERE i.id = p_id_inscripcion
    LIMIT 1;

    -- Si no se encontró la inscripción, lanzar error y salir
    IF v_estatus_actual IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: la inscripción indicada no existe.';
    ELSE
        -- Actualizar el estatus en inscripciones
        UPDATE inscripciones
        SET estatus = p_nuevo_estatus
        WHERE id = p_id_inscripcion;

        -- Registrar el movimiento en historial_status
        INSERT INTO historial_status (id_inscripcion, estatus_anterior, estatus_nuevo, fecha_cambio, motivo)
        VALUES (p_id_inscripcion, v_estatus_actual, p_nuevo_estatus, CURDATE(), p_motivo);

        -- Confirmar la operación al llamador
        SELECT
            v_nombre_alumno AS alumno,
            v_estatus_actual AS estatus_anterior,
            p_nuevo_estatus  AS estatus_nuevo,
            CURDATE() AS fecha_cambio,
            p_motivo AS motivo;
    END IF;
END$$

DELIMITER ;

-- -- Ejemplo de uso:
-- -- CALL registrar_cambio_estatus(2, 'activo', 'Regularización de adeudo completada');

-- ----------------------------------------------------------------
-- -- Queries de análisis --
-- ----------------------------------------------------------------

-- -- 1. Alumnos activos por programa
-- SELECT
--     p.nombre AS programa,
--     COUNT(i.id) AS alumnos_activos
-- FROM inscripciones i
-- JOIN programas p ON p.id = i.id_programa
-- WHERE i.estatus = 'activo'
-- GROUP BY p.id, p.nombre
-- ORDER BY alumnos_activos DESC;

-- -- 2. Alumnos que tuvieron al menos un cambio de estatus en los últimos 30 días
-- SELECT DISTINCT
--     a.id AS id_alumno,
--     a.nombre AS alumno,
--     a.empresa,
--     hs.fecha_cambio,
--     hs.estatus_anterior,
--     hs.estatus_nuevo
-- FROM historial_status hs
-- JOIN inscripciones i ON i.id = hs.id_inscripcion
-- JOIN alumnos a ON a.id = i.id_alumno
-- WHERE hs.fecha_cambio >= CURDATE() - INTERVAL 30 DAY
-- ORDER BY hs.fecha_cambio DESC;

-- -- 3. Tasa de baja por programa (bajas / total inscritos)
-- SELECT
--     p.nombre AS programa,
--     COUNT(i.id) AS total_inscritos,
--     SUM(i.estatus IN ('baja_empresa','baja_programa')) AS total_bajas,
--     ROUND(SUM(i.estatus IN ('baja_empresa','baja_programa')) / COUNT(i.id) * 100, 2) AS tasa_baja_pct
-- FROM inscripciones i
-- JOIN programas p ON p.id = i.id_programa
-- GROUP BY p.id, p.nombre
-- ORDER BY tasa_baja_pct DESC;

-- -- 4. Historial completo de un alumno específico (JOIN de 4 tablas)
-- SELECT
--     a.id AS id_alumno,
--     a.nombre AS alumno,
--     a.empresa,
--     p.nombre AS programa,
--     hs.fecha_cambio,
--     hs.estatus_anterior,
--     hs.estatus_nuevo,
--     hs.motivo
-- FROM alumnos a
-- JOIN inscripciones i ON i.id_alumno = a.id
-- JOIN programas p ON p.id = i.id_programa
-- JOIN historial_status hs ON hs.id_inscripcion = i.id
-- WHERE a.id = 1 -- cambiar al id del alumno
-- ORDER BY hs.fecha_cambio ASC;

-- -- 5. Alumnos que pasaron de baja_empresa a activo (reingreso)
-- SELECT
--     a.id AS id_alumno,
--     a.nombre AS alumno,
--     a.empresa,
--     p.nombre AS programa,
--     hs.fecha_cambio AS fecha_reingreso,
--     hs.motivo
-- FROM historial_status hs
-- JOIN inscripciones i ON i.id = hs.id_inscripcion
-- JOIN alumnos a ON a.id = i.id_alumno
-- JOIN programas p ON p.id = i.id_programa
-- WHERE hs.estatus_anterior = 'baja_empresa'
--   AND hs.estatus_nuevo IN ('activo', 'reingreso')
-- ORDER BY hs.fecha_cambio ASC;

-- -- -------------------------------------------------------
-- -- Indicador 6: Tiempo promedio de activación por programa
-- -- -------------------------------------------------------
-- -- Definición:
-- --   Mide cuántos días transcurren en promedio entre el momento
-- --   en que un alumno queda registrado como 'inscrito' y el momento
-- --   en que su estatus cambia a 'activo', agrupado por programa.
-- --
-- -- Fórmula:
-- --   AVG( fecha_cambio('activo') - fecha_cambio('inscrito') )  por programa
-- --   Expresado en días con un decimal de precisión.
-- --
-- -- Justificación:
-- --   Un tiempo de activación largo puede señalar cuellos de botella
-- --   administrativos (validación de documentos, pagos, asignación de grupo).
-- --   Permite comparar la eficiencia operativa entre programas y establecer
-- --   un umbral máximo de días aceptable para la institución.

-- SELECT
--     p.nombre AS programa,
--     COUNT(DISTINCT i.id_alumno) AS alumnos,
--     ROUND(AVG(DATEDIFF(hs_activo.fecha_cambio, hs_inscrito.fecha_cambio)), 1) AS dias_promedio_activacion
-- FROM inscripciones i
-- JOIN programas p ON p.id = i.id_programa
-- JOIN historial_status hs_inscrito
--     ON hs_inscrito.id_inscripcion = i.id
--     AND hs_inscrito.estatus_nuevo = 'inscrito'
--     AND hs_inscrito.estatus_anterior IS NULL
-- JOIN historial_status hs_activo
--     ON hs_activo.id_inscripcion = i.id
--     AND hs_activo.estatus_nuevo = 'activo'
--     AND hs_activo.estatus_anterior = 'inscrito'
-- GROUP BY p.id, p.nombre
-- ORDER BY dias_promedio_activacion DESC;