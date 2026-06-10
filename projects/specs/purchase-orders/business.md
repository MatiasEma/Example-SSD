# business.md

## Objetivo

Permitir la creación y aprobación de órdenes de compra.

## Reglas de negocio

* Toda orden debe contener al menos un ítem.
* El monto total debe ser mayor a cero.
* Las órdenes aprobadas no pueden modificarse.
* Órdenes superiores a USD 10.000 requieren doble aprobación.

## Flujo

### Crear Orden

1. Seleccionar proveedor.
2. Agregar ítems.
3. Guardar.
4. Registrar como pendiente.

### Aprobar Orden

1. Seleccionar orden.
2. Aprobar.
3. Cambiar estado a APPROVED.
