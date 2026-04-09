export type DebouncedFunction<T extends (...args: never[]) => void> = ((
  ...args: Parameters<T>
) => void) & { cancel: () => void };

/**
 * Leading debounce: runs immediately, then ignores calls for `waitMs`.
 */
export function debounceLeading<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): DebouncedFunction<T> {
  let last = 0;

  const wrapped = function debounced(this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - last >= waitMs) {
      last = now;
      fn.apply(this, args);
    }
  } as DebouncedFunction<T>;

  wrapped.cancel = () => {
    last = 0;
  };

  return wrapped;
}

/**
 * Trailing debounce: invokes after `waitMs` since the last call.
 */
export function debounceTrailing<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const wrapped = function debounced(this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(this, args);
    }, waitMs);
  } as DebouncedFunction<T>;

  wrapped.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return wrapped;
}
