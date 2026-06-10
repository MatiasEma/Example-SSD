import { beforeEach, describe, expect, it } from 'vitest';
import { resetStore } from '../../mocks/handlers';
import { purchaseOrdersService } from '../../services/purchaseOrders.service';

describe('purchaseOrdersService', () => {
  beforeEach(() => {
    resetStore();
  });

  it('obtiene una lista vacía inicialmente', async () => {
    const orders = await purchaseOrdersService.getAll();
    expect(orders).toEqual([]);
  });

  it('crea una orden pendiente', async () => {
    const created = await purchaseOrdersService.create({
      supplier: 'Proveedor SA',
      observations: 'Urgente',
      items: [{ description: 'Teclado', quantity: 2, unitPrice: 50 }],
    });

    expect(created.status).toBe('PENDING');
    expect(created.totalAmount).toBe(100);
    expect(created.orderNumber).toMatch(/^PO-/);
  });

  it('aprueba una orden de monto bajo en un paso', async () => {
    const created = await purchaseOrdersService.create({
      supplier: 'Proveedor SA',
      observations: 'Normal',
      items: [{ description: 'Mouse', quantity: 1, unitPrice: 100 }],
    });

    const approved = await purchaseOrdersService.approve(created.id);

    expect(approved.status).toBe('APPROVED');
    expect(approved.approvalCount).toBe(1);
  });

  it('requiere doble aprobación para montos altos', async () => {
    const created = await purchaseOrdersService.create({
      supplier: 'Proveedor SA',
      observations: 'Compra mayor',
      items: [{ description: 'Servidor', quantity: 1, unitPrice: 15_000 }],
    });

    const firstApproval = await purchaseOrdersService.approve(created.id);
    expect(firstApproval.status).toBe('PENDING_SECOND_APPROVAL');

    const secondApproval = await purchaseOrdersService.approve(created.id);
    expect(secondApproval.status).toBe('APPROVED');
    expect(secondApproval.approvalCount).toBe(2);
  });

  it('no permite aprobar una orden ya aprobada', async () => {
    const created = await purchaseOrdersService.create({
      supplier: 'Proveedor SA',
      observations: 'Normal',
      items: [{ description: 'Mouse', quantity: 1, unitPrice: 100 }],
    });

    await purchaseOrdersService.approve(created.id);

    await expect(purchaseOrdersService.approve(created.id)).rejects.toThrow(
      'Las órdenes aprobadas no pueden modificarse',
    );
  });
});
