# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lee los 3 scenarios del requisito "Lo que cada tarea muestra de su responsable" que se encuentra en la spec viva "openspec/specs/tasks/spec.md" y y también lee los tests existentes en este proyecto.
Después, genera una tabla (matriz) de trazabilidad en formato markdown donde por cada scenario de este requisito se indique si hay un test que lo cubre. 
En el caso en que un scenario sea cubierto por un test, se debe indicar el nombre exacto del test con que aparece en la suite de pruebas (código).
En el caso en que tengas así sea una mínima duda de si el scenario está o no cubierto, se debe indicar "No lo se" en vez de cubierto o no y adicionalmente se debe indicar qúe hizo falta para decidirse por una opción.
Las columnas de la tabla entonces deben ser: | Scenario | Test que lo cubre | Estado | Que faltó para decidir el estado |
Donde Estado puede tener los sgtes posibles valores: Cubierto, No cubierto, No lo sé.
Esta matriz de trazabilidad dejamela en el archivo vacío que ya existe para esto: docs/verificacion/lgg.md
```

**Qué salió:** Ninguno de los 3 scenarios tiene un test que lo cubra, y no hubo ninguno dudoso. Ya que de hecho en el proyecto NO hay ningún test implementado para la capability de Tasks.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Al revisar los scenarios del requisto "Lo que cada tarea muestra de su responsable" identificas que alguno de estos le falta alguna regla o algo en especifico que impida crear un test 100% confiable y atado a este scenario.?
```

**Qué salió:** Se encontraron varias deficiencias (inconsistencias) en los scenarios.
---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisemos una a una las cosas que faltan por aclarar (definir) en estos scenarios para que despues me ayudes a crear los tests de estos para q si sean confiables
```
