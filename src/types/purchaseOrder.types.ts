export type PurchaseOrderStatus = 'PENDING' | 'PENDING_SECOND_APPROVAL' | 'APPROVED';

export interface PurchaseOrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  date: string;
  supplier: string;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  observations: string;
  totalAmount: number;
  approvalCount: number;
}

export interface CreatePurchaseOrderPayload {
  supplier: string;
  items: PurchaseOrderItem[];
  observations: string;
}

export interface PurchaseOrderFormValues {
  supplier: string;
  items: PurchaseOrderItem[];
  observations: string;
}
