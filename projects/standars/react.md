# React Standards

## Arquitectura

* Los componentes deben ser principalmente visuales.
* Toda lógica reutilizable debe implementarse mediante hooks.
* Toda comunicación HTTP debe realizarse exclusivamente desde `services`.
* Debe mantenerse una separación clara entre UI, lógica de negocio y acceso a datos.

## TypeScript

* `strict` obligatorio.
* `noImplicitAny` habilitado.
* Prohibido utilizar `any`.
* Prohibido utilizar `@ts-ignore`.

## Calidad de Código

* Evitar duplicación de lógica y código.
* Priorizar reutilización mediante composición y hooks.
* Mantener componentes pequeños, cohesivos y desacoplados.
* Favorecer código legible y mantenible sobre soluciones complejas.

## Seguridad

* Prohibido almacenar tokens en `localStorage`.
* Prohibido exponer secretos o credenciales en el código cliente.
* Prohibido utilizar `dangerouslySetInnerHTML`.
* Prohibido hardcodear URLs o credenciales.
* Validar y sanitizar los datos antes de enviarlos al backend.
* No exponer información sensible en mensajes de error.

## Testing

* Los hooks, services y utilidades deben contar con pruebas.
* Las pruebas deben contemplar casos exitosos, errores y casos borde.
* No es obligatorio testear componentes puramente visuales.

## Convenciones

### Naming

* Componentes: `PascalCase`
* Hooks: prefijo `use`
* Funciones y variables: `camelCase`
* Services: sufijo `.service.ts`
* Types: nombres descriptivos y específicos

## Estructura Base

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
