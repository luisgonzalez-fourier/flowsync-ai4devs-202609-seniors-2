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
Realiza una exploración en mi base de código para identificar lo que tenemos ya implementado únicamente con respecto a la capability (módulo) de Cuentas y Acceso que cubre registro, inicio de sesión, sesión y perfil.
La exploración debe ser en sus dos capas, tanto en backend (rutas, controladores, modelo de datos, validadores, middlewares) como frontend (pantallas de acceso, estado de sesion, protección de rutas).
No es necesario que explores otra funcionalidad diferente a la de Cuentas y acceso ni que me sugieras mejoras.
NO debes modificar el codigo, sólo necesito que lo explores.
Después de esta exploración me vas a ayudar a crear un documento de especificación md con un formato y reglas especificas que luego te daré. Por ahora sólo ejecuta la exploración.
```

**Qué salió:** Generó un resumen completo y conciso de lo explorado. No se desvió en lo que se le pidió. No revisó otras cosas a parte de la vertical de cuenta y acceso. No hizo nada adicional.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Listo, con ese contexto que ya tienes, ayudame a crear una primera versión de la spec de esta capability (Cuentas y acceso) en el documento que ya existe: docs/spec-viva/lgg.md.
Debes seguir estrictamente las siguientes restricciones:
El formato de la spec:
	1. Arriba, un ## Purpose de una o dos frases: para qué existe esta capability.
	2. Debajo, ## Requirements, y colgando de él ### Requirement: en los que el sistema SHALL hacer algo.
	3. Bajo cada requisito, al menos un #### Scenario: de cuatro almohadillas, con dos viñetas: **WHEN** y **THEN**. No hay casilla para el GIVEN: la precondición se mete dentro del WHEN.
	4. En castellano, salvo las mayúsculas de la RFC.

Reglas duras:
	1. Nada de ADDED, MODIFIED ni REMOVED ya que es la spec actual del sistema no es un delta.
	2. Sólo comportamiento observable. Nada de aspectos técnicos como clases o rutas de archivo.
	3. NO debes modificar el codigo. sólo estamos documentando la spec de una capability existente: Cuentas y acceso
	4. Ninguna otra funcionalidad solo la de Cuentas y acceso
```

**Qué salió:** Generó el contenido de la spec solicitada en el archivo y formato especificado. 
