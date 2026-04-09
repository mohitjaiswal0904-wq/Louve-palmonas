import type { ReactNode } from "react";

export function ComingSoon({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <h1 className="text-xl font-light tracking-wide">{title}</h1>
      <p className="text-sm text-muted-foreground">{body}</p>
      {children ? <div className="pt-2">{children}</div> : null}
    </div>
  );
}
