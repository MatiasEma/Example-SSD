import { describe, expect, it } from 'vitest';
import { purchaseOrderFormSchema } from '../../utils/purchaseOrder.schema';

describe('purchaseOrderFormSchema', () => {
  it('valida un formulario correcto', () => {
    const result = purchaseOrderFormSchema.safeParse({
      supplier: 'Proveedor SA',
      observations: 'Entrega urgente',
      items: [{ description: 'Monitor', quantity: 2, unitPrice: 100 }],
    });

    expect(result.success).toBe(true);
  });

  it('rechaza formularios sin ítems', () => {
    const result = purchaseOrderFormSchema.safeParse({
      supplier: 'Proveedor SA',
      observations: 'Entrega urgente',
      items: [],
    });

    expect(result.success).toBe(false);
  });

  it('rechaza montos totales en cero', () => {
    const result = purchaseOrderFormSchema.safeParse({
      supplier: 'Proveedor SA',
      observations: 'Entrega urgente',
      items: [{ description: 'Monitor', quantity: 0, unitPrice: 100 }],
    });

    expect(result.success).toBe(false);
  });

  it('rechaza campos obligatorios vacíos', () => {
    const result = purchaseOrderFormSchema.safeParse({
      supplier: '',
      observations: '',
      items: [{ description: '', quantity: 1, unitPrice: 10 }],
    });

    expect(result.success).toBe(false);
  });
});
