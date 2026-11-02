# src/app/api/

HTTP API surface. All first-party JSON endpoints are versioned under
[`v1/`](v1/README.md).

See [`../../../docs/api/API_CONVENTIONS.md`](../../../docs/api/API_CONVENTIONS.md)
for the envelope, status codes, validation, error mapping, and handler
template.

## Layout

```
api/
└── v1/
    ├── health/route.ts        -> liveness
    └── db/health/route.ts     -> DB readiness
```

New endpoints go under `v1/<module>/route.ts` (or
`v1/<module>/[param]/route.ts`). Breaking changes bump the version
(`v2/`); the old version stays until retired.
