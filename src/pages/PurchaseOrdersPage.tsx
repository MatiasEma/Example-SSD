import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { OrdersTable } from '../components/OrdersTable';
import { PurchaseOrderForm } from '../components/PurchaseOrderForm';
import { usePurchaseOrders } from '../hooks/usePurchaseOrders';
import type { PurchaseOrderFormSchema } from '../utils/purchaseOrder.schema';

export function PurchaseOrdersPage() {
  const {
    orders,
    isLoading,
    isError,
    errorMessage,
    isEmpty,
    createOrder,
    isCreating,
    createError,
    approveOrder,
    isApproving,
    approveError,
    selectedOrderId,
  } = usePurchaseOrders();

  const handleCreateOrder = async (values: PurchaseOrderFormSchema) => {
    await createOrder(values);
  };

  const handleApproveOrder = async (orderId: string) => {
    await approveOrder(orderId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Órdenes de Compra
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Creación y aprobación de órdenes de compra.
          </Typography>
        </Box>

        <PurchaseOrderForm
          isSubmitting={isCreating}
          errorMessage={createError}
          onSubmit={handleCreateOrder}
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            Listado
          </Typography>

          {isError && errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {approveError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {approveError}
            </Alert>
          ) : null}

          <OrdersTable
            orders={orders}
            isLoading={isLoading}
            isEmpty={isEmpty}
            isApproving={isApproving}
            approvingOrderId={selectedOrderId}
            onApprove={handleApproveOrder}
          />
        </Box>
      </Stack>
    </Container>
  );
}
