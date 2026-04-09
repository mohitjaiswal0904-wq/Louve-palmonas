/** Generic API response shape matching the Go backend `response.Body`. */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp?: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

export type PaginatedResponse<T = unknown> = {
  success: boolean;
  data: T;
  pagination: Pagination;
  timestamp: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
