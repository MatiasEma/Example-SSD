# Órdenes de Compra · SDD Example

Aplicación frontend para la **creación y aprobación de órdenes de compra**, desarrollada con **Spec-Driven Development (SDD)**. Las especificaciones y estándares del proyecto viven en `projects/` y guían la implementación.

---

## Características

- Listado de órdenes con número, fecha, proveedor, estado y monto total
- Formulario de alta con validaciones (Zod + React Hook Form)
- Flujo de aprobación simple y **doble aprobación** para montos superiores a USD 10.000
- Arquitectura desacoplada: UI, hooks, services y utilidades
- Mock API con MSW para desarrollo local sin backend
- Suite de tests con Vitest (~90% cobertura en lógica crítica)

---

## Stack

| Área | Tecnología |
|------|------------|
| UI | React 19, Material UI |
| Estado remoto | TanStack Query |
| Formularios | React Hook Form + Zod |
| HTTP | Axios |
| Build | Vite + TypeScript (strict) |
| Tests | Vitest, Testing Library, MSW |

---

## Requisitos previos

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (recomendado)

> También podés usar `npm` o `yarn`, pero los comandos de este README usan `pnpm`.

---

## Primeros pasos

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd example-with-sdd
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y ajustalo si hace falta:

```bash
cp .env.example .env
```

Contenido por defecto:

```env
VITE_API_URL=/api
```

En desarrollo, MSW intercepta las llamadas a `/api` y simula el backend. Si conectás un backend real, apuntá `VITE_API_URL` a su URL base.

### 4. Levantar la aplicación

```bash
pnpm dev
```

Abrí [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo con HMR |
| `pnpm build` | Compila TypeScript y genera el build de producción |
| `pnpm preview` | Sirve el build localmente |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm test` | Corre la suite de tests |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm test:coverage` | Tests con reporte de cobertura |

---

## Estructura del proyecto

```text
example-with-sdd/
├── projects/
│   ├── specs/purchase-orders/   # Especificaciones de negocio y UI
│   ├── standars/                  # Estándares (React, testing, seguridad)
│   └── skills/                    # Guías de implementación
├── public/
│   └── mockServiceWorker.js       # Worker de MSW
└── src/
    ├── pages/                     # Pantallas
    ├── components/                # Componentes visuales
    ├── hooks/                     # Lógica reutilizable + TanStack Query
    ├── services/                  # Comunicación HTTP (Axios)
    ├── types/                     # Tipos TypeScript
    ├── utils/                     # Validaciones, sanitización, reglas de negocio
    ├── constants/                 # Constantes de dominio
    ├── mocks/                     # Handlers MSW
    └── tests/                     # Pruebas unitarias
```

---

## Reglas de negocio

| Regla | Comportamiento |
|-------|----------------|
| Ítems mínimos | Toda orden debe tener al menos un ítem |
| Monto total | Debe ser mayor a cero |
| Aprobación simple | Montos ≤ USD 10.000 → una sola aprobación |
| Doble aprobación | Montos > USD 10.000 → dos aprobaciones requeridas |
| Órdenes aprobadas | No pueden modificarse ni re-aprobarse |

Los estados posibles son: `PENDING` → `PENDING_SECOND_APPROVAL` → `APPROVED`.

---

## Arquitectura

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌─────────┐
│  Components │ ──▶ │    Hooks     │ ──▶ │    Services     │ ──▶ │   API   │
│  (solo UI)  │     │ (TanStack Q) │     │    (Axios)      │     │  / MSW  │
└─────────────┘     └──────────────┘     └─────────────────┘     └─────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Utils     │
                    │ (negocio +   │
                    │  validación) │
                    └──────────────┘
```

- Los **componentes** no consumen APIs ni contienen lógica de negocio
- Los **hooks** orquestan queries/mutations y exponen datos listos para la UI
- Los **services** son el único punto de acceso HTTP
- Las **validaciones** se definen con esquemas Zod centralizados

---

## Spec-Driven Development

Este repo es un ejemplo de SDD: antes de codear, las specs definen qué construir.

| Documento | Ubicación |
|-----------|-----------|
| Reglas de negocio | `projects/specs/purchase-orders/business.md` |
| UI y validaciones | `projects/specs/purchase-orders/ui.md` |
| Estándares React | `projects/standars/react.md` |
| Estándares de testing | `projects/standars/testing.md` |
| Estándares de seguridad | `projects/standars/security.md` |
| Skill de implementación | `projects/skills/adviters-react.md` |

---

## Build de producción

```bash
pnpm build
pnpm preview
```

El output queda en `dist/`. Servilo con cualquier hosting estático (Vercel, Netlify, S3, etc.).

---
