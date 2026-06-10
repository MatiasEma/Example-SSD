import type { PurchaseOrderStatus } from '../types/purchaseOrder.types';

export const DOUBLE_APPROVAL_THRESHOLD = 10_000;

export const PURCHASE_ORDER_QUERY_KEY = ['purchase-orders'] as const;

export const PURCHASE_ORDER_STATUS_LABELS: Record<PurchaseOrderStatus, string> = {
  PENDING: 'Pendiente',
  PENDING_SECOND_APPROVAL: 'Pendiente 2da aprobación',
  APPROVED: 'Aprobada',
};
