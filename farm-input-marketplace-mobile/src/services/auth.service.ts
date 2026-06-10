import { apiClient } from '@/api/client';
import { registerDealerApplication } from '@/api/dealers';
import type {
  AuthResponse,
  DealerRegisterPayload,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpPayload,
} from '@/types/auth';

export async function registerUser(payload: RegisterPayload) {
  const response = await apiClient.post<RegisterResponse>('/auth/register', payload);
  return response.data;
}

export async function registerDealer(payload: DealerRegisterPayload) {
  return registerDealerApplication(payload);
}

export async function loginUser(payload: LoginPayload) {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const response = await apiClient.post<AuthResponse & { message: string }>(
    '/auth/verify-otp',
    payload,
  );
  return response.data;
}

export async function resendOtp(identifier: string) {
  const response = await apiClient.post<{ message: string; otpSent: boolean }>(
    '/auth/resend-otp',
    { identifier },
  );
  return response.data;
}
