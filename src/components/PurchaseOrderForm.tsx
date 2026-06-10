import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { calculateTotalAmount } from '../utils/purchaseOrder.utils';
import type { PurchaseOrderFormSchema } from '../utils/purchaseOrder.schema';
import { purchaseOrderFormSchema } from '../utils/purchaseOrder.schema';

interface PurchaseOrderFormProps {
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (values: PurchaseOrderFormSchema) => Promise<void>;
}

const defaultItem = {
  description: '',
  quantity: 1,
  unitPrice: 0,
};

export function PurchaseOrderForm({
  isSubmitting,
  errorMessage,
  onSubmit,
}: PurchaseOrderFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PurchaseOrderFormSchema>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      supplier: '',
      observations: '',
      items: [defaultItem],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const totalAmount = calculateTotalAmount(watchedItems ?? []);

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Crear Orden de Compra
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          <TextField
            label="Proveedor"
            fullWidth
            required
            error={Boolean(errors.supplier)}
            helperText={errors.supplier?.message}
            {...register('supplier')}
          />

          <TextField
            label="Observaciones"
            fullWidth
            required
            multiline
            minRows={2}
            error={Boolean(errors.observations)}
            helperText={errors.observations?.message}
            {...register('observations')}
          />

          <Box>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="subtitle1">Ítems</Typography>
              <Button type="button" onClick={() => append(defaultItem)}>
                Agregar ítem
              </Button>
            </Stack>

            {errors.items?.message ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.items.message}
              </Alert>
            ) : null}

            <Stack spacing={2}>
              {fields.map((field, index) => (
                <Stack
                  key={field.id}
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  sx={{
                    alignItems: { xs: 'stretch', md: 'flex-start' },
                  }}
                >
                  <TextField
                    label="Ítem"
                    fullWidth
                    required
                    error={Boolean(errors.items?.[index]?.description)}
                    helperText={errors.items?.[index]?.description?.message}
                    {...register(`items.${index}.description`)}
                  />
                  <TextField
                    label="Cantidad"
                    type="number"
                    required
                    sx={{ minWidth: 120 }}
                    error={Boolean(errors.items?.[index]?.quantity)}
                    helperText={errors.items?.[index]?.quantity?.message}
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  />
                  <TextField
                    label="Precio unitario"
                    type="number"
                    required
                    sx={{ minWidth: 140 }}
                    error={Boolean(errors.items?.[index]?.unitPrice)}
                    helperText={errors.items?.[index]?.unitPrice?.message}
                    {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                  />
                  <IconButton
                    type="button"
                    aria-label="Eliminar ítem"
                    color="error"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    ×
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Typography variant="subtitle1" align="right">
            Monto total:{' '}
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'USD',
            }).format(totalAmount)}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear Orden'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
