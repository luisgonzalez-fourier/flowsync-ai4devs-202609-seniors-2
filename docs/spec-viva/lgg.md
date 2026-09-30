# Cuentas y acceso

## Purpose

Permitir que una persona cree su cuenta en FlowSync, entre y salga de ella y consulte sus datos de perfil, de forma que solo quien tiene una sesión válida acceda a las áreas privadas de la aplicación.

## Requirements

### Requirement: Registro de cuenta

El sistema SHALL permitir crear una cuenta nueva a partir de un nombre completo opcional, un email, una contraseña y su confirmación, y SHALL dejar a la persona con la sesión iniciada al terminar.

#### Scenario: Registro con datos válidos

- **WHEN** una persona sin sesión envía el formulario de registro con un email válido que no está registrado, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** se crea la cuenta, la sesión queda iniciada y la persona llega a su perfil sin tener que iniciar sesión aparte

#### Scenario: Registro sin nombre completo

- **WHEN** una persona se registra dejando vacío el nombre completo, o solo con espacios
- **THEN** la cuenta se crea sin nombre y el perfil muestra "Sin nombre" en su lugar

#### Scenario: Email ya registrado

- **WHEN** una persona intenta registrarse con un email que ya pertenece a otra cuenta
- **THEN** no se crea ninguna cuenta y bajo el campo de email aparece "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Email con formato inválido

- **WHEN** una persona intenta registrarse con un email que no tiene formato de dirección de correo
- **THEN** no se crea ninguna cuenta y bajo el campo de email aparece "Introduce una dirección de email válida."

#### Scenario: Contraseña demasiado corta

- **WHEN** una persona intenta registrarse con una contraseña de menos de 8 caracteres
- **THEN** no se crea ninguna cuenta y se indica que la contraseña debe tener al menos 8 caracteres

#### Scenario: Contraseña demasiado larga

- **WHEN** una persona intenta registrarse con una contraseña de más de 32 caracteres
- **THEN** no se crea ninguna cuenta y se indica que la contraseña no puede superar los 32 caracteres

#### Scenario: Confirmación de contraseña distinta

- **WHEN** una persona envía el formulario de registro con una confirmación que no coincide con la contraseña
- **THEN** no se crea ninguna cuenta y bajo el campo de confirmación aparece "Las contraseñas no coinciden."

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión con email y contraseña, y SHALL rechazar las credenciales incorrectas sin revelar si el email existe.

#### Scenario: Credenciales correctas

- **WHEN** una persona sin sesión introduce el email y la contraseña de una cuenta existente
- **THEN** la sesión queda iniciada y la persona llega a su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** una persona introduce un email que no está registrado, o un email registrado con una contraseña que no es la suya
- **THEN** no se inicia sesión y aparece el mismo aviso en ambos casos: "El email o la contraseña no son correctos."

#### Scenario: Email con formato inválido al iniciar sesión

- **WHEN** una persona intenta iniciar sesión con un email que no tiene formato de dirección de correo
- **THEN** no se inicia sesión y bajo el campo de email aparece "Introduce una dirección de email válida."

#### Scenario: Envío en curso

- **WHEN** una persona envía el formulario de inicio de sesión o de registro y la respuesta aún no ha llegado
- **THEN** el botón de envío queda deshabilitado y muestra "Entrando…" o "Creando cuenta…" respectivamente

### Requirement: Persistencia de la sesión

El sistema SHALL conservar la sesión iniciada entre recargas y reaperturas del navegador, y SHALL comprobar con el servidor que sigue siendo válida antes de dar acceso.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con la sesión iniciada recarga la página o vuelve a abrir la aplicación en el mismo navegador
- **THEN** se muestra un indicador de carga mientras se verifica la sesión y, a continuación, la persona sigue dentro sin volver a introducir credenciales

#### Scenario: Sesión rechazada por el servidor

- **WHEN** la aplicación se abre con una sesión guardada que el servidor ya no reconoce
- **THEN** la sesión guardada se descarta, la persona llega a la pantalla de inicio de sesión y allí aparece "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor inaccesible al restaurar la sesión

- **WHEN** la aplicación se abre con una sesión guardada y no consigue contactar con el servidor
- **THEN** la persona llega a la pantalla de inicio de sesión con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." y la sesión guardada se conserva, de modo que al recargar con el servidor disponible vuelve a estar dentro

#### Scenario: Duración de la sesión

- **WHEN** una persona inicia sesión y no la cierra
- **THEN** la sesión sigue siendo válida sin límite de tiempo hasta que la cierre explícitamente

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión actual, invalidándola en el servidor, y SHALL dejar a la persona fuera de la aplicación aunque el servidor no responda.

#### Scenario: Cierre de sesión desde el perfil

- **WHEN** una persona con sesión iniciada pulsa "Cerrar sesión" en su perfil
- **THEN** el botón pasa a "Cerrando sesión…", la sesión deja de ser válida y la persona llega a la pantalla de inicio de sesión

#### Scenario: Otras sesiones de la misma cuenta

- **WHEN** una persona tiene la sesión iniciada en dos navegadores y la cierra en uno de ellos
- **THEN** la sesión del otro navegador sigue activa

#### Scenario: Cierre de sesión con el servidor inaccesible

- **WHEN** una persona pulsa "Cerrar sesión" y el servidor no responde
- **THEN** la sesión se cierra igualmente en su navegador y llega a la pantalla de inicio de sesión

### Requirement: Consulta del perfil

El sistema SHALL mostrar a la persona con sesión iniciada sus datos de cuenta: iniciales, nombre completo, email y fecha de alta, y SHALL NOT exponer nunca su contraseña.

#### Scenario: Ver el perfil

- **WHEN** una persona con sesión iniciada abre su perfil
- **THEN** ve un avatar con sus iniciales, su nombre completo (o "Sin nombre" si no lo indicó), su email y "Miembro desde" con la fecha de alta en formato largo en castellano

#### Scenario: Iniciales con nombre de dos o más palabras

- **WHEN** el nombre completo de la cuenta tiene al menos dos palabras
- **THEN** las iniciales son la primera letra de las dos primeras palabras, en mayúsculas

#### Scenario: Iniciales sin nombre o con nombre de una palabra

- **WHEN** la cuenta no tiene nombre completo
- **THEN** las iniciales se forman con la primera letra de la parte del email anterior a la arroba y la primera letra de la parte posterior, en mayúsculas; y si el nombre es de una sola palabra, son sus dos primeras letras en mayúsculas

#### Scenario: La contraseña no se expone

- **WHEN** el sistema devuelve los datos de una cuenta, ya sea tras registrarse, iniciar sesión o consultar el perfil
- **THEN** la respuesta no incluye la contraseña en ninguna forma

### Requirement: Protección de áreas privadas y públicas

El sistema SHALL reservar las áreas privadas a quien tiene sesión válida y SHALL redirigir a quien ya tiene sesión fuera de las pantallas de inicio de sesión y registro.

#### Scenario: Acceso anónimo al perfil

- **WHEN** una persona sin sesión intenta abrir su perfil
- **THEN** es redirigida a la pantalla de inicio de sesión

#### Scenario: Acceso a inicio de sesión o registro con sesión activa

- **WHEN** una persona con sesión iniciada intenta abrir la pantalla de inicio de sesión o la de registro
- **THEN** es redirigida a su perfil

#### Scenario: Dirección desconocida

- **WHEN** una persona abre una dirección de la aplicación que no existe
- **THEN** es redirigida al perfil, y desde ahí a la pantalla de inicio de sesión si no tiene sesión

#### Scenario: Petición sin sesión válida a datos privados

- **WHEN** se piden los datos del perfil o el cierre de sesión al servidor sin una sesión válida
- **THEN** el servidor rechaza la petición como no autenticada y no devuelve datos de ninguna cuenta

#### Scenario: Navegación entre inicio de sesión y registro

- **WHEN** una persona sin sesión está en la pantalla de inicio de sesión o en la de registro
- **THEN** dispone de un enlace para pasar a la otra pantalla

### Requirement: Errores comprensibles

El sistema SHALL mostrar los errores de acceso en castellano, junto al campo afectado cuando lo hay, o como aviso general del formulario cuando no.

#### Scenario: Error asociado a un campo

- **WHEN** el servidor rechaza un formulario de registro o de inicio de sesión por un campo concreto que está en pantalla
- **THEN** el mensaje aparece bajo ese campo y el campo queda marcado como inválido

#### Scenario: Servidor inaccesible al enviar un formulario

- **WHEN** una persona envía el formulario de registro o de inicio de sesión y el servidor no responde
- **THEN** aparece como aviso general "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error inesperado del servidor

- **WHEN** el servidor falla por un motivo no previsto al procesar un formulario de acceso
- **THEN** aparece como aviso general "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

## Parte B

### 1. Cuántos requisitos escribió el agente, y cuántos comprobaste tú abriendo el código.
- Escritos por el agente: 7
- Comprobados contra el código manualmente por el humano: 2

### 2. Incoherencias encontradas

- **Scenario: Envío en curso** en Requirement 2 - Inicio de sesión: Dice que el boton muestra "Entrando…" o **"Creando cuenta…"** ... Pero al ser un escenario de Inicio de sesión no debería mostrar el texto "Creando cuenta…". este aplica es cuando se incia sesión. Se estan mezclando scenarios de distinto requirement.

### 3. Lo que no supiste decidir si era un bug o el contrato

- En el requirment "Persistencia de la Sesión", el scenario **Duración de la sesión**: En la actualidad no suena logico dejar que la sesión nunca caduque. Por seguridad / provacidad la sesiónd ebería expirar después de x tiempo sin uso.