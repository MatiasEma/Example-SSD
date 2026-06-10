import { http, HttpResponse } from 'msw';
import {
  calculateTotalAmount,
  getNextStatusAfterApproval,
  sanitizePurchaseOrderPayload,
} from '../utils/purchaseOrder.utils';
import type {
  CreatePurchaseOrderPayload,
  PurchaseOrder,
} from '../types/purchaseOrder.types';

let orders: PurchaseOrder[] = [];
let orderCounter = 1;

function resetStore(): void {
  orders = [];
  orderCounter = 1;
}

export { resetStore };

export const handlers = [
  http.get('/api/purchase-orders', () => {
    return HttpResponse.json(orders);
  }),

  http.post('/api/purchase-orders', async ({ request }) => {
    const body = (await request.json()) as CreatePurchaseOrderPayload;
    const payload = sanitizePurchaseOrderPayload(body);
    const totalAmount = calculateTotalAmount(payload.items);

    if (payload.items.length === 0) {
      return HttpResponse.json('Debe existir al menos un ítem', { status: 400 });
    }

    if (totalAmount <= 0) {
      return HttpResponse.json('El monto total debe ser mayor a cero', { status: 400 });
    }

    const order: PurchaseOrder = {
      id: crypto.randomUUID(),
      orderNumber: `PO-${String(orderCounter).padStart(4, '0')}`,
      date: new Date().toISOString(),
      supplier: payload.supplier,
      status: 'PENDING',
      items: payload.items,
      observations: payload.observations,
      totalAmount,
      approvalCount: 0,
    };

    orderCounter += 1;
    orders = [order, ...orders];

    return HttpResponse.json(order, { status: 201 });
  }),

  http.patch('/api/purchase-orders/:id/approve', ({ params }) => {
    const order = orders.find((item) => item.id === params.id);

    if (!order) {
      return HttpResponse.json('Orden no encontrada', { status: 404 });
    }

    if (order.status === 'APPROVED') {
      return HttpResponse.json('Las órdenes aprobadas no pueden modificarse', { status: 400 });
    }

    try {
      const nextStatus = getNextStatusAfterApproval(order.status, order.totalAmount);
      const updatedOrder: PurchaseOrder = {
        ...order,
        status: nextStatus,
        approvalCount: order.approvalCount + 1,
      };

      orders = orders.map((item) => (item.id === order.id ? updatedOrder : item));

      return HttpResponse.json(updatedOrder);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo aprobar la orden';
      return HttpResponse.json(message, { status: 400 });
    }
  }),
];
