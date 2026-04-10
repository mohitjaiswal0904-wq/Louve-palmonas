"use client";

import { useMessages } from "@/hooks";
import { Button } from "@/components/ui/button";
import type { Pagination } from "@/types";

type Props = {
  pagination: Pagination;
  onPageChange: (page: number) => void;
};

export function PaginationBar({ pagination, onPageChange }: Props) {
  const m = useMessages();
  const { page, totalPages, hasNext, hasPrev } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="h-8 text-xs"
      >
        {m.catalog.previous}
      </Button>
      <span className="text-xs tabular-nums text-muted-foreground">
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="h-8 text-xs"
      >
        {m.catalog.next}
      </Button>
    </div>
  );
}
