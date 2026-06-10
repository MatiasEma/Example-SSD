import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { resetStore } from '../../mocks/handlers';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('usePurchaseOrders', () => {
  beforeEach(() => {
    resetStore();
  });

  it('expone estado inicial de carga y luego lista vacía', async () => {
    const { result } = renderHook(() => usePurchaseOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
    expect(result.current.isEmpty).toBe(true);
  });

  it('crea una orden y actualiza el listado', async () => {
    const { result } = renderHook(() => usePurchaseOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.createOrder({
      supplier: 'Proveedor SA',
      observations: 'Entrega programada',
      items: [{ description: 'Silla', quantity: 1, unitPrice: 200 }],
    });

    await waitFor(() => {
      expect(result.current.orders).toHaveLength(1);
    });

    expect(result.current.orders[0]?.supplier).toBe('Proveedor SA');
    expect(result.current.orders[0]?.status).toBe('PENDING');
  });

  it('propaga errores al aprobar una orden inexistente', async () => {
    const { result } = renderHook(() => usePurchaseOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await expect(
      result.current.approveOrder('00000000-0000-0000-0000-000000000000'),
    ).rejects.toThrow('Orden no encontrada');
  });
});
