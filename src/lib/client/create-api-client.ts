export type ApiClient = {
  baseUrl: string;
  get: (path: string, init?: RequestInit) => Promise<Response>;
};

export function createApiClient(options: {
  baseUrl: string;
  fetchImpl: typeof fetch;
  defaultHeaders?: HeadersInit;
}): ApiClient {
  const root = options.baseUrl.replace(/\/$/, "");

  return {
    baseUrl: root,
    get: (path, init) => {
      const url = path.startsWith("/") ? `${root}${path}` : `${root}/${path}`;
      return options.fetchImpl(url, {
        ...init,
        headers: {
          Accept: "application/json",
          ...options.defaultHeaders,
          ...init?.headers,
        },
      });
    },
  };
}
