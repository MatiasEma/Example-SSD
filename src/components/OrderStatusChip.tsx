import Chip from '@mui/material/Chip';
import { PURCHASE_ORDER_STATUS_LABELS } from '../constants/purchaseOrder.constants';
import type { PurchaseOrderStatus } from '../types/purchaseOrder.types';

interface OrderStatusChipProps {
  status: PurchaseOrderStatus;
}

const STATUS_COLORS: Record<
  PurchaseOrderStatus,
  'default' | 'warning' | 'success'
> = {
  PENDING: 'warning',
  PENDING_SECOND_APPROVAL: 'warning',
  APPROVED: 'success',
};

export function OrderStatusChip({ status }: OrderStatusChipProps) {
  return (
    <Chip
      label={PURCHASE_ORDER_STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size="small"
    />
  );
}
