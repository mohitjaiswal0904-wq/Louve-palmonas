# src/lib/errors/

Framework-agnostic error model.

- `app-error.ts` — `AppError`, `AppErrorCode`, HTTP status mapping.

## Usage

```ts
if (!input.ok) {
  throw new AppError("VALIDATION_ERROR", "Thing is invalid.");
}
```

Route handlers catch and map via
[`@/lib/http/response#toErrorResponse`](../http/response.ts).

## Rules

- Message is **client-safe**. No stack traces, SQL, env values.
- `details` is optional and must also be client-safe.
- Add a new `AppErrorCode` only when you need a distinct HTTP status.
