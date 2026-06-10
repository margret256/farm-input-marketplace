import { apiClient } from './client';
import type { DealerDocumentPayload, DealerRegisterPayload, RegisterResponse } from '@/types/auth';

export type DealerDocumentUpload = {
  type: string;
  name: string;
  uri: string;
  mimeType: string;
};

export async function uploadDealerDocument(document: DealerDocumentUpload) {
  const formData = new FormData();

  formData.append('type', document.type);
  formData.append('file', {
    uri: document.uri,
    name: document.name,
    type: document.mimeType,
  } as unknown as { uri: string; name: string; type: string });

  const response = await apiClient.post<DealerDocumentPayload>(
    '/dealers/documents/upload',
    formData,
  );

  return response.data;
}

export async function registerDealerApplication(payload: DealerRegisterPayload) {
  const response = await apiClient.post<RegisterResponse>('/auth/register/dealer', payload);
  return response.data;
}