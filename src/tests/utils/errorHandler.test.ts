import { describe, expect, it } from 'vitest';
import { getErrorMessage } from '../../utils/errorHandler';

describe('errorHandler', () => {
  it('retorna el mensaje de un Error', () => {
    expect(getErrorMessage(new Error('Error de prueba'))).toBe('Error de prueba');
  });

  it('retorna mensaje por defecto para errores desconocidos', () => {
    expect(getErrorMessage(undefined)).toBe(
      'Ocurrió un error inesperado. Intente nuevamente.',
    );
  });
});
