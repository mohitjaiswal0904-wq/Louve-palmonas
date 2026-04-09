export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center p-8">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-foreground" />
    </div>
  );
}
