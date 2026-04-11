import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  AuthResponse,
  SendOTPRequest,
  VerifyOTPRequest,
  UpdateProfileRequest,
  UserResponse,
} from "@/types";

/**
 * Auth service — calls backend auth endpoints through the Next.js catch-all proxy.
 * The proxy handles HTTP-only cookies (access + refresh tokens) transparently.
 */

export async function sendOTP(client: ApiClient, data: SendOTPRequest) {
  return client.post<ApiResponse<null>>("/api/v1/auth/send-otp", data);
}

export async function verifyOTP(client: ApiClient, data: VerifyOTPRequest) {
  return client.post<ApiResponse<AuthResponse>>("/api/v1/auth/verify-otp", data);
}

export async function logout(client: ApiClient) {
  return client.post<ApiResponse<null>>("/api/v1/auth/logout");
}

export async function updateProfile(client: ApiClient, data: UpdateProfileRequest) {
  return client.put<ApiResponse<UserResponse>>("/api/v1/auth/profile", data);
}

export async function getMe(client: ApiClient) {
  return client.get<ApiResponse<UserResponse>>("/api/v1/auth/me");
}
