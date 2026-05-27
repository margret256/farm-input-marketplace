import { isAxiosError } from 'axios';

import { apiClient } from '@/api/client';

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join('\n');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (!error.response) {
      return `Cannot reach the API at ${apiClient.defaults.baseURL}. If you are testing on a phone, use your computer LAN IP instead of localhost.`;
    }

    if (error.message) {
      return error.message;
    }
  }

  return fallback;
}
