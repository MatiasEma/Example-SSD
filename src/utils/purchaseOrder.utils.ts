import { DOUBLE_APPROVAL_THRESHOLD } from '../constants/purchaseOrder.constants';
import type {
  CreatePurchaseOrderPayload,
  PurchaseOrderItem,
  PurchaseOrderStatus,
} from '../types/purchaseOrder.types';
import { sanitizeText } from './sanitize';

export function calculateTotalAmount(items: PurchaseOrderItem[]): number {
  return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
}

export function requiresDoubleApproval(totalAmount: number): boolean {
  return totalAmount > DOUBLE_APPROVAL_THRESHOLD;
}

export function getNextStatusAfterApproval(
  currentStatus: PurchaseOrderStatus,
  totalAmount: number,
): PurchaseOrderStatus {
  if (currentStatus === 'APPROVED') {
    throw new Error('Las órdenes aprobadas no pueden modificarse.');
  }

  if (!requiresDoubleApproval(totalAmount)) {
    return 'APPROVED';
  }

  if (currentStatus === 'PENDING') {
    return 'PENDING_SECOND_APPROVAL';
  }

  return 'APPROVED';
}

export function sanitizePurchaseOrderPayload(
  payload: CreatePurchaseOrderPayload,
): CreatePurchaseOrderPayload {
  return {
    supplier: sanitizeText(payload.supplier),
    observations: sanitizeText(payload.observations),
    items: payload.items.map((item) => ({
      description: sanitizeText(item.description),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  };
}

export function canApproveOrder(status: PurchaseOrderStatus): boolean {
  return status === 'PENDING' || status === 'PENDING_SECOND_APPROVAL';
}
