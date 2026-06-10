import type {
  CreatePurchaseOrderPayload,
  PurchaseOrder,
} from '../types/purchaseOrder.types';
import { apiClient } from './apiClient';

const ENDPOINT = '/purchase-orders';

export const purchaseOrdersService = {
  async getAll(): Promise<PurchaseOrder[]> {
    const { data } = await apiClient.get<PurchaseOrder[]>(ENDPOINT);
    return data;
  },

  async create(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder> {
    const { data } = await apiClient.post<PurchaseOrder>(ENDPOINT, payload);
    return data;
  },

  async approve(id: string): Promise<PurchaseOrder> {
    const { data } = await apiClient.patch<PurchaseOrder>(`${ENDPOINT}/${id}/approve`);
    return data;
  },
};
