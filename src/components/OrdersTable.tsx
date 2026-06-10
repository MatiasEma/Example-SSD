import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { canApproveOrder } from '../utils/purchaseOrder.utils';
import type { PurchaseOrder } from '../types/purchaseOrder.types';
import { OrderStatusChip } from './OrderStatusChip';

interface OrdersTableProps {
  orders: PurchaseOrder[];
  isLoading: boolean;
  isEmpty: boolean;
  isApproving: boolean;
  approvingOrderId: string | null;
  onApprove: (orderId: string) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function OrdersTable({
  orders,
  isLoading,
  isEmpty,
  isApproving,
  approvingOrderId,
  onApprove,
}: OrdersTableProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress aria-label="Cargando órdenes" />
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Alert severity="info">No hay órdenes de compra registradas.</Alert>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="Listado de órdenes de compra">
        <TableHead>
          <TableRow>
            <TableCell>Número de orden</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Monto total</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            const canApprove = canApproveOrder(order.status);
            const isCurrentApproval = isApproving && approvingOrderId === order.id;

            return (
              <TableRow key={order.id} hover>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>
                  <OrderStatusChip status={order.status} />
                </TableCell>
                <TableCell align="right">{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell align="center">
                  {canApprove ? (
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={isApproving}
                      onClick={() => onApprove(order.id)}
                    >
                      {isCurrentApproval ? 'Aprobando...' : 'Aprobar Orden'}
                    </Button>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      —
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
