"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks";

export default function SearchClient() {
  const m = useMessages();
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search/${encodeURIComponent(q)}`);
    }
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6">
      <h1 className="text-xl font-light tracking-wide">{m.catalog.searchTitle}</h1>
      <p className="text-sm text-muted-foreground">{m.catalog.searchSubtitle}</p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <Input
          type="search"
          placeholder={m.catalog.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11"
          autoFocus
        />
        <Button
          type="submit"
          className="h-11 bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {m.catalog.searchButton}
        </Button>
      </form>
    </div>
  );
}
