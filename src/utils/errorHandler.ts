import { isAxiosError } from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error inesperado. Intente nuevamente.';

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const message = error.response?.data;

    if (typeof message === 'string' && message.length > 0) {
      return message;
    }

    if (
      typeof message === 'object' &&
      message !== null &&
      'message' in message &&
      typeof message.message === 'string'
    ) {
      return message.message;
    }

    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado. Intente nuevamente.';
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return DEFAULT_ERROR_MESSAGE;
}
