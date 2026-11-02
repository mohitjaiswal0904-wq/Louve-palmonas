# src/lib/http/

HTTP primitives shared by route handlers.

- `response.ts` — `ok()`, `fail()`, `toErrorResponse()`, envelope types.

## Rules

- Every first-party JSON endpoint uses these helpers. No hand-rolled
  envelopes.
- External responses (upstream APIs) are forwarded verbatim; do not
  wrap them in Louve's envelope.
- `toErrorResponse` auto-maps `AppError` and `ZodError`. Unknown errors
  become `INTERNAL_ERROR` with no leaked internals.
