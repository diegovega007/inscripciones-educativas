# Respuestas — Preguntas conceptuales

Proyecto: **Sistema de Inscripciones Educativas**

---

## SQL / MariaDB

### Pregunta 1

**Enunciado:** Tu tabla historial_estatus crece rápido. ¿Qué harías para que las consultas de historial no se vuelvan lentas con el tiempo?

**Respuesta:**

Haria que cada consulta haga uso de la paginación como tambien de ciertos filtros para poder obtimizar la visulización de los registros.

---

### Pregunta 2

**Enunciado:** Un alumno aparece dos veces con estatus activo seguido en el historial, sin una baja intermedia. ¿Cómo detectarías ese problema y cómo lo evitarías desde el diseño?

**Respuesta:**
Para detectarlo haría una consulta que compare cada registro del historial con el anterior del mismo alumno, buscando casos donde estatus_nuevo sea igual al estatus_anterior del siguiente movimiento sin una baja entre ellos, Para evitarlo el stored procedure de cambio de estatus debería validar que el nuevo estatus sea diferente al actual antes de insertar.
## Python / Pandas

### Pregunta 3

**Enunciado:** Tienes un DataFrame con 50,000 registros de movimientos. Al hacer un groupby por programa y mes, algunos meses no aparecen para ciertos programas. ¿Qué causa eso y cómo lo resuelves?

**Respuesta:**

Ocurre porque groupby solo devuelve las combinaciones de programa y mes que sí tienen registros en el dataframe. Si en un mes no hubo movimientos para un programa, esa combinación no aparece en el resultado. Para resolverlo, hay que generar todas las combinaciones posibles de programa y mes (por ejemplo con un índice completo o reindexando) y rellenar con cero los meses que no tuvieron actividad.

---

### Pregunta 4

**Enunciado:** ¿Cuál es la diferencia entre usar merge y join en pandas? ¿Cuándo usarías cada uno?

**Respuesta:**

Merge une dos dataframes indicando explícitamente las columnas (o índices) por las que se relacionan. Join es un atajo de merge pensado para unir por el índice del dataframe, es más directo cuando ambos tienen el índice bien definido. Usaría merge cuando necesito control total sobre las columnas de unión o cuando los datos no están indexados. Usaría join cuando la unión es por índice y quiero una sintaxis más simple.

---

## Angular

### Pregunta 5

**Enunciado:** Tu componente de tabla de alumnos re-renderiza completo cada vez que cambias el estatus de uno solo. ¿Qué causaría eso y cómo lo optimizarías?

*(Pista: piensa en `ChangeDetectionStrategy`)*

**Respuesta:**

Suele pasar porque Angular usa detección de cambios por defecto y al actualizar el estatus se vuelve a evaluar todo el componente y todas las filas del ngFor. Lo optimizaría usando ChangeDetectionStrategy.OnPush para reducir revisiones innecesarias, agregando trackBy en la tabla para que Angular reutilice las filas que no cambiaron, y separando cada fila en un componente hijo con OnPus` para que solo se renderice de nuevo la fila modificada.

---

### Pregunta 6

**Enunciado:** ¿Dónde guardarías el estatus actual de los alumnos en una app Angular sin backend: en el componente directamente, en un Service compartido, o en localStorage? Justifica tu elección.

**Respuesta:**

Lo guardaría en un Service compartido. En el componente no conviene porque el estatus también lo necesitan otras vistas (como resumen y registro) y duplicar el estado genera inconsistencias. LocalStorage sirve si quieres que los datos sigan al recargar, pero agrega complejidad a la hora de evaluar los datos y no es necesario para el estado de sesión. Un Service centralizado actúa como fuente única, cualquier cambio de estatus se refleja en todos los componentes suscritos sin recargar la página.

---
