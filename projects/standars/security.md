# Security.md

## Frontend

### Gestión de Credenciales

* No almacenar tokens en localStorage.
* Preferir cookies HttpOnly cuando la arquitectura lo permita.
* Nunca hardcodear credenciales.
* Todas las URLs deben provenir de variables de entorno.

### Validación de Datos

* Validar toda entrada de usuario antes de enviarla al backend.
* Utilizar esquemas tipados para validaciones.
* Sanitizar contenido ingresado por usuarios.

### Protección contra XSS

* No utilizar `dangerouslySetInnerHTML`.
* Escapar contenido dinámico cuando corresponda.
* No renderizar HTML proveniente de usuarios sin sanitización.

### Manejo de Errores

* No exponer stack traces.
* No exponer detalles internos de APIs.
* Mostrar mensajes amigables al usuario.

### Comunicación

* Utilizar únicamente HTTPS.
* No enviar información sensible en query params.
* Configurar timeouts en todas las llamadas HTTP.

### Dependencias

* Mantener dependencias actualizadas.
* Evitar librerías sin mantenimiento activo.
* Eliminar dependencias no utilizadas.
