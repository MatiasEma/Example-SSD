# React Skills

## Tecnologías Obligatorias

* React 19+
* TypeScript (modo estricto)
* Axios
* TanStack Query
* React Hook Form
* Zod
* Material UI (MUI)
* Vitest + Testing Library

---

# Estructura de Carpetas

```text
src/
├── pages/
├── components/
├── hooks/
├── services/
├── types/
├── utils/
├── constants/
└── tests/
```

---

# Arquitectura

## Componentes

Los componentes deben ser exclusivamente responsables de la presentación.

No deben:

* Consumir APIs.
* Contener lógica de negocio.
* Realizar transformaciones complejas de datos.

Deben:

* Recibir datos mediante props.
* Emitir eventos mediante callbacks.
* Ser reutilizables y desacoplados.

## Hooks

Toda lógica reutilizable debe implementarse mediante hooks.

Ejemplos:

* `useUsers`
* `useOrders`
* `useAuth`
* `useFilters`

Los hooks son responsables de:

* Orquestar llamadas a services.
* Manejar estado local.
* Integrar TanStack Query.
* Exponer datos preparados para la UI.

## Services

La carpeta `services` es la única autorizada para realizar llamadas HTTP.

Ejemplo:

```text
services/
└── users.service.ts
```

Responsabilidades:

* Consumir APIs.
* Mapear requests y responses.
* Centralizar endpoints.
* Configurar headers cuando corresponda.

No deben contener lógica visual.

---

# Comunicación HTTP

## Axios

Toda comunicación HTTP debe utilizar una única instancia compartida.

Ejemplo:

```ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

Debe incluir:

* Interceptor de autenticación.
* Interceptor de manejo de errores.
* Timeout configurado.
* Headers centralizados.

---

# Estado Remoto

## TanStack Query

Toda información proveniente del backend debe gestionarse mediante TanStack Query.

Utilizar:

* `useQuery` para lecturas.
* `useMutation` para escrituras.

Evitar:

* `useEffect` para cargar datos.
* Estado local para cachear respuestas de APIs.

---

# Formularios

Todos los formularios deben implementarse utilizando:

* React Hook Form.
* Zod Resolver.

Las validaciones deben definirse mediante esquemas Zod y no distribuirse manualmente dentro de los componentes.

---

# TypeScript

Obligatorio:

* `strict: true`
* `noImplicitAny: true`

Evitar:

* `any`
* `@ts-ignore`

Preferir:

* Interfaces.
* Types específicos.
* Genéricos cuando aporten reutilización.

---

# Seguridad

Implementar siempre:

* Sanitización de datos ingresados por el usuario.
* Validación antes de enviar información al backend.
* Manejo seguro de errores sin revelar detalles internos.
* Protección de secretos fuera del cliente.

No utilizar:

* `dangerouslySetInnerHTML`.
* Credenciales hardcodeadas.
* URLs hardcodeadas.
* `localStorage` para almacenar tokens sensibles.

---

# Manejo de Errores

Todos los errores deben pasar por una capa centralizada.

Las pantallas no deben interpretar directamente errores HTTP.

Los mensajes al usuario deben ser consistentes, amigables y desacoplados de la implementación técnica.

---

# Testing

Cobertura esperada:

* Hooks.
* Services.
* Utilidades.

Cada prueba debe contemplar:

* Casos exitosos.
* Casos de error.
* Casos borde.

Los componentes puramente visuales no requieren pruebas obligatorias.

---

# Convenciones

## Naming

Componentes:

```text
UserCard.tsx
OrdersTable.tsx
```

Hooks:

```text
useUsers.ts
useOrders.ts
```

Services:

```text
users.service.ts
orders.service.ts
```

Types:

```text
user.types.ts
order.types.ts
```

---

# Principios

* Mantener componentes pequeños y enfocados.
* Priorizar composición sobre complejidad.
* Evitar duplicación de lógica.
* Favorecer reutilización mediante hooks.
* Mantener una separación estricta entre UI, lógica y acceso a datos.
* Generar código legible, consistente y fácil de mantener antes que soluciones ingeniosas.
