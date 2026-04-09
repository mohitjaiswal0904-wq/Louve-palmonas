import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
  UserResponse,
} from "@/types";

/**
 * Auth service — calls backend auth endpoints through the Next.js catch-all proxy.
 * The proxy handles HTTP-only cookies (access + refresh tokens) transparently.
 */

export async function login(client: ApiClient, data: LoginRequest) {
  return client.post<ApiResponse<AuthResponse>>("/api/v1/auth/login", data);
}

export async function signup(client: ApiClient, data: SignupRequest) {
  return client.post<ApiResponse<AuthResponse>>("/api/v1/auth/signup", data);
}

export async function logout(client: ApiClient) {
  return client.post<ApiResponse<null>>("/api/v1/auth/logout");
}

export async function forgotPassword(client: ApiClient, data: ForgotPasswordRequest) {
  return client.post<ApiResponse<null>>("/api/v1/auth/forgot-password", data);
}

export async function resetPassword(client: ApiClient, data: ResetPasswordRequest) {
  return client.post<ApiResponse<null>>("/api/v1/auth/reset-password", data);
}

export async function getMe(client: ApiClient) {
  return client.get<ApiResponse<UserResponse>>("/api/v1/auth/me");
}
