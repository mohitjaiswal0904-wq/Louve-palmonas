export type ThrottledFunction<T extends (...args: never[]) => void> = ((
  ...args: Parameters<T>
) => void) & { cancel: () => void };

/**
 * Trailing throttle: at most one call per `waitMs`, scheduled after the last burst.
 */
export function throttleTrailing<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): ThrottledFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const wrapped = function throttled(this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    if (timeout) return;
    timeout = setTimeout(() => {
      timeout = null;
      if (lastArgs) fn.apply(this, lastArgs);
    }, waitMs);
  } as ThrottledFunction<T>;

  wrapped.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
  };

  return wrapped;
}

/**
 * Leading throttle: fires immediately, then ignores calls for `waitMs`.
 */
export function throttleLeading<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): ThrottledFunction<T> {
  let last = 0;

  const wrapped = function throttled(this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - last >= waitMs) {
      last = now;
      fn.apply(this, args);
    }
  } as ThrottledFunction<T>;

  wrapped.cancel = () => {
    last = 0;
  };

  return wrapped;
}
