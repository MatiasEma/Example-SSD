import { describe, expect, it } from 'vitest';
import {
  calculateTotalAmount,
  canApproveOrder,
  getNextStatusAfterApproval,
  requiresDoubleApproval,
  sanitizePurchaseOrderPayload,
} from '../../utils/purchaseOrder.utils';

describe('purchaseOrder.utils', () => {
  describe('calculateTotalAmount', () => {
    it('calcula el monto total de los ítems', () => {
      const total = calculateTotalAmount([
        { description: 'Tornillos', quantity: 2, unitPrice: 50 },
        { description: 'Tuercas', quantity: 3, unitPrice: 10 },
      ]);

      expect(total).toBe(130);
    });

    it('retorna cero cuando no hay ítems', () => {
      expect(calculateTotalAmount([])).toBe(0);
    });
  });

  describe('requiresDoubleApproval', () => {
    it('requiere doble aprobación cuando supera el umbral', () => {
      expect(requiresDoubleApproval(10_001)).toBe(true);
    });

    it('no requiere doble aprobación en el umbral exacto', () => {
      expect(requiresDoubleApproval(10_000)).toBe(false);
    });
  });

  describe('getNextStatusAfterApproval', () => {
    it('aprueba directamente montos menores o iguales al umbral', () => {
      expect(getNextStatusAfterApproval('PENDING', 5_000)).toBe('APPROVED');
    });

    it('pasa a segunda aprobación en montos altos', () => {
      expect(getNextStatusAfterApproval('PENDING', 15_000)).toBe(
        'PENDING_SECOND_APPROVAL',
      );
    });

    it('aprueba en la segunda aprobación de montos altos', () => {
      expect(getNextStatusAfterApproval('PENDING_SECOND_APPROVAL', 15_000)).toBe(
        'APPROVED',
      );
    });

    it('lanza error si la orden ya está aprobada', () => {
      expect(() => getNextStatusAfterApproval('APPROVED', 15_000)).toThrow(
        'Las órdenes aprobadas no pueden modificarse.',
      );
    });
  });

  describe('canApproveOrder', () => {
    it('permite aprobar órdenes pendientes', () => {
      expect(canApproveOrder('PENDING')).toBe(true);
      expect(canApproveOrder('PENDING_SECOND_APPROVAL')).toBe(true);
    });

    it('no permite aprobar órdenes ya aprobadas', () => {
      expect(canApproveOrder('APPROVED')).toBe(false);
    });
  });

  describe('sanitizePurchaseOrderPayload', () => {
    it('sanitiza texto y conserva valores numéricos', () => {
      const sanitized = sanitizePurchaseOrderPayload({
        supplier: '  Proveedor <X>  ',
        observations: '  Observación  ',
        items: [{ description: '  Ítem <1>  ', quantity: 2, unitPrice: 10 }],
      });

      expect(sanitized).toEqual({
        supplier: 'Proveedor X',
        observations: 'Observación',
        items: [{ description: 'Ítem 1', quantity: 2, unitPrice: 10 }],
      });
    });
  });
});
