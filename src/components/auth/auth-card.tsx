"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-[420px] border-0 shadow-sm bg-white dark:bg-zinc-900">
        <CardHeader className="space-y-2 pb-2 text-center">
          <Link
            href="/"
            className="mx-auto mb-4 inline-block text-xl font-semibold tracking-[0.2em] text-zinc-900 dark:text-zinc-50"
          >
            LOUVE
          </Link>
          <h1 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </CardHeader>
        <CardContent className="pt-2">
          {children}
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
