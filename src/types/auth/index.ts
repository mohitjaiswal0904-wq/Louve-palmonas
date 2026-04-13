/** Auth request/response types matching the Go backend auth module DTOs. */

export type SendOTPRequest = {
  phone: string;
};

export type VerifyOTPRequest = {
  phone: string;
  code: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type UpdateProfileRequest = {
  display_name?: string;
  email?: string;
  locale?: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: string;
  is_new_user: boolean;
  user: UserResponse;
  session: SessionResponse;
};

export type UserResponse = {
  id: number;
  /** Louve ops code, e.g. LV0000001 */
  user_code?: string;
  phone: string;
  email?: string;
  status: string;
  role: string;
  profile?: ProfileResponse;
  created_at: string;
};

export type ProfileResponse = {
  display_name?: string;
  phone?: string;
  avatar_url?: string;
  locale?: string;
  time_zone?: string;
};

export type SessionResponse = {
  id: number;
  device_label?: string;
  ip_address?: string;
  is_online: boolean;
  last_seen_at: string;
  created_at: string;
  expires_at: string;
  location?: LocationResponse;
};

export type LocationResponse = {
  country?: string;
  country_code?: string;
  region_name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
  is_proxy: boolean;
  is_mobile: boolean;
  is_hosting: boolean;
};
