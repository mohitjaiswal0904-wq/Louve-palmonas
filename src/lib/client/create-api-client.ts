export type ApiClient = {
  baseUrl: string;
  get: <T = unknown>(path: string, init?: RequestInit) => Promise<T>;
  post: <T = unknown>(path: string, body?: unknown, init?: RequestInit) => Promise<T>;
  put: <T = unknown>(path: string, body?: unknown, init?: RequestInit) => Promise<T>;
  del: <T = unknown>(path: string, init?: RequestInit) => Promise<T>;
};

export function createApiClient(options: {
  baseUrl: string;
  fetchImpl: typeof fetch;
  defaultHeaders?: HeadersInit;
}): ApiClient {
  const root = options.baseUrl.replace(/\/$/, "");

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    init?: RequestInit,
  ): Promise<T> {
    const url = path.startsWith("/") ? `${root}${path}` : `${root}/${path}`;
    const res = await options.fetchImpl(url, {
      method,
      ...init,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...options.defaultHeaders,
        ...init?.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : init?.body,
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) {
      const err = new Error(json?.error?.message ?? res.statusText) as Error & {
        status: number;
        code: string;
        details: Record<string, unknown>;
      };
      err.status = res.status;
      err.code = json?.error?.code ?? "UNKNOWN";
      err.details = json?.error?.details;
      throw err;
    }
    return json as T;
  }

  return {
    baseUrl: root,
    get: <T = unknown>(path: string, init?: RequestInit) =>
      request<T>("GET", path, undefined, init),
    post: <T = unknown>(path: string, body?: unknown, init?: RequestInit) =>
      request<T>("POST", path, body, init),
    put: <T = unknown>(path: string, body?: unknown, init?: RequestInit) =>
      request<T>("PUT", path, body, init),
    del: <T = unknown>(path: string, init?: RequestInit) =>
      request<T>("DELETE", path, undefined, init),
  };
}
