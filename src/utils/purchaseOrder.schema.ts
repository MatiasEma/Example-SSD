import { z } from 'zod';
import { calculateTotalAmount } from './purchaseOrder.utils';

const purchaseOrderItemSchema = z.object({
  description: z.string().trim().min(1, 'La descripción del ítem es obligatoria'),
  quantity: z.number().positive('La cantidad debe ser mayor a cero'),
  unitPrice: z.number().positive('El precio unitario debe ser mayor a cero'),
});

export const purchaseOrderFormSchema = z
  .object({
    supplier: z.string().trim().min(1, 'El proveedor es obligatorio'),
    observations: z.string().trim().min(1, 'Las observaciones son obligatorias'),
    items: z.array(purchaseOrderItemSchema).min(1, 'Debe existir al menos un ítem'),
  })
  .refine((data) => calculateTotalAmount(data.items) > 0, {
    message: 'El monto total debe ser mayor a cero',
    path: ['items'],
  });

export type PurchaseOrderFormSchema = z.infer<typeof purchaseOrderFormSchema>;
