import { getMessagesForRequest } from "@/lib/l10n/server";

export default async function Loading() {
  const m = await getMessagesForRequest();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center p-8">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-foreground"
        role="status"
        aria-label={m.common.loading}
      />
    </div>
  );
}
