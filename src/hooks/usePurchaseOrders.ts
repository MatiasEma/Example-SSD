import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PURCHASE_ORDER_QUERY_KEY } from '../constants/purchaseOrder.constants';
import { purchaseOrdersService } from '../services/purchaseOrders.service';
import type { CreatePurchaseOrderPayload } from '../types/purchaseOrder.types';
import { sanitizePurchaseOrderPayload } from '../utils/purchaseOrder.utils';

export function usePurchaseOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: PURCHASE_ORDER_QUERY_KEY,
    queryFn: purchaseOrdersService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreatePurchaseOrderPayload) =>
      purchaseOrdersService.create(sanitizePurchaseOrderPayload(payload)),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PURCHASE_ORDER_QUERY_KEY });
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => purchaseOrdersService.approve(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PURCHASE_ORDER_QUERY_KEY });
    },
  });

  return {
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    errorMessage: ordersQuery.error?.message ?? null,
    isEmpty: !ordersQuery.isLoading && (ordersQuery.data?.length ?? 0) === 0,
    createOrder: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message ?? null,
    approveOrder: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    approveError: approveMutation.error?.message ?? null,
    selectedOrderId: approveMutation.variables ?? null,
  };
}
