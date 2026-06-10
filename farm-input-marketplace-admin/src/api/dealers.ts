import { apiRequest, resolveApiAssetUrl } from './client';

export type DealerVerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type DealerDocument = {
  id: string;
  dealerId: string;
  type: string;
  name: string;
  url: string;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
};

export type DealerApplication = {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  status: DealerVerificationStatus;
  verificationStatus: DealerVerificationStatus;
  reviewedAt?: string | null;
  reviewNote?: string | null;
  documents: DealerDocument[];
  createdAt: string;
  updatedAt: string;
};

function normalizeDealer(dealer: DealerApplication): DealerApplication {
  return {
    ...dealer,
    documents: dealer.documents.map((document) => ({
      ...document,
      url: resolveApiAssetUrl(document.url),
    })),
  };
}

export async function fetchDealersForReview(
  status: DealerVerificationStatus | 'ALL' = 'PENDING',
) {
  const dealers = await apiRequest<DealerApplication[]>(
    status === 'ALL' ? '/dealers/review' : `/dealers/review?status=${status}`,
  );

  return dealers.map(normalizeDealer);
}

export async function approveDealer(id: string, reviewNote?: string) {
  const dealer = await apiRequest<DealerApplication>(`/dealers/${id}/approve`, {
    method: 'PATCH',
    body: JSON.stringify({ reviewNote }),
  });

  return normalizeDealer(dealer);
}

export async function rejectDealer(id: string, reviewNote?: string) {
  const dealer = await apiRequest<DealerApplication>(`/dealers/${id}/reject`, {
    method: 'PATCH',
    body: JSON.stringify({ reviewNote }),
  });

  return normalizeDealer(dealer);
}
