# Testing.md

## Objetivo

Garantizar calidad, mantenibilidad y confianza en los cambios mediante pruebas automatizadas.

---

# Herramientas

* Vitest
* React Testing Library
* Mock Service Worker (MSW) cuando sea necesario

---

# Cobertura

Cobertura mínima esperada: 80%.

Priorizar pruebas sobre:

* Lógica de negocio.
* Hooks personalizados.
* Servicios.
* Utilidades.

---

# Hooks

Todo hook con lógica de negocio debe tener pruebas unitarias.

Validar:

* Estado inicial.
* Flujo exitoso.
* Manejo de errores.
* Casos límite.

---

# Services

Todo service debe tener pruebas.

Validar:

* Requests correctos.
* Mapeo de respuestas.
* Manejo de errores.
* Comportamiento ante respuestas inesperadas.

---

# Componentes

Priorizar pruebas de comportamiento sobre implementación.

Validar:

* Renderizado esperado.
* Interacción del usuario.
* Estados de carga.
* Estados de error.
* Estados vacíos.

No testear detalles internos de implementación.

---

# Buenas Prácticas

* Utilizar mocks únicamente cuando sea necesario.
* Mantener pruebas independientes.
* Nombrar pruebas de forma descriptiva.
* Una prueba debe validar un único comportamiento.

---

# Casos Obligatorios

Toda funcionalidad nueva debe contemplar:

* Caso exitoso.
* Caso de error.
* Caso sin datos.
* Validaciones principales.

---

# Criterio de Aceptación

No se debe considerar una funcionalidad terminada si:

* Existen pruebas fallando.
* No se cumple la cobertura mínima.
* No se validan escenarios de error relevantes.
