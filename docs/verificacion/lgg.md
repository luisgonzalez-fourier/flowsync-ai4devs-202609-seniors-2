## Parte A

Requisito: «Lo que cada tarea muestra de su responsable» (`openspec/specs/tasks/spec.md`)

Scenarios en el requisito: 3 · Cubiertos: 0

| Scenario | Test que lo cubre | Estado | Que faltó para decidir el estado |
|---|---|---|---|
| Responsable identificable | — | No cubierto | |
| La tarea no filtra datos de cuenta | — | No cubierto | |
| Responsable sin nombre | — | No cubierto | |

Notas:

- La suite solo tiene 4 ficheros, todos de `auth` (`backend/tests/functional/auth/`: `initials.spec.ts`, `login.spec.ts`, `session.spec.ts`, `signup.spec.ts`). Ninguno llama a `/api/v1/tasks` ni mira un `assignee`. `frontend/` no tiene tests.
- Lo más parecido son los tests de iniciales de `Auth | iniciales` («un nombre de dos palabras da la inicial de cada una», «sin nombre, las iniciales salen del email») y «una cuenta puede quedarse sin nombre» de `Auth | registro`. Comprueban el cálculo de `initials` y el `fullName` nulo en la respuesta de login o de registro, no en el `assignee` de una tarea. Por eso no cuentan como cobertura de estos scenarios.

## Parte B

### 1. Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban.
Scenarios que creía cubierto antes de mirar: 0
Scenarios que si estaban después de la revisión: 0

### 2. El scenario en el que no supiste si faltaba un test o faltaba la regla en la spec.
No hubo ninguno dudoso. Ya que de hecho en el proyecto NO hay ningún test implementado para la capability de Tasks "openspec/specs/tasks/spec.md".

### 3. Algo que el scenario no determinaba y tuviste que decidir al escribir el test.
- La tarea no filtra datos de cuenta:
    El requisito y el scenario piden cosas distintas.  
    El requisito dice que la tarea muestra nombre e iniciales y ningún otro dato de esa cuenta. Eso es una lista cerrada de campos permitidos.  
    El scenario solo prohíbe el email ni ningún otro dato de acceso. Eso es una lista de campos prohibidos.  
- Responsable identificable:  
No da el valor esperado. Dice «sus iniciales», no "AL". El test tiene que sacar ese valor de la spec de auth («Iniciales de la cuenta»), así que el scenario no se sostiene solo.  
- Responsable sin nombre:
No da el valor esperado. Dice que las iniciales «siguen llegando». Un test que solo compruebe que no están vacías es débil. Uno que compruebe "AE" depende de otra spec.