const DEFAULT_API_URL = 'http://localhost:3000/api';

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ??
  DEFAULT_API_URL;

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export function resolveApiAssetUrl(url: string) {
  if (/^(https?:|data:|file:)/.test(url)) {
    return url;
  }

  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.message || `API request failed with status ${response.status}`;

    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return response.json() as Promise<T>;
}
