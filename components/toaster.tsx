"use client";

import { useEffect, useState } from "react";

type Toast = { id: number; message: string; tone: "success" | "info" };

declare global {
  interface WindowEventMap {
    "app:toast": CustomEvent<{ message: string; tone?: Toast["tone"] }>;
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let counter = 0;
    function handle(event: CustomEvent<{ message: string; tone?: Toast["tone"] }>) {
      const id = ++counter;
      const tone = event.detail.tone ?? "success";
      setToasts((prev) => [...prev, { id, message: event.detail.message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 1800);
    }
    window.addEventListener("app:toast", handle);
    return () => window.removeEventListener("app:toast", handle);
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-background/95 px-4 py-2 text-sm shadow-[0_12px_32px_-12px_color-mix(in_oklch,var(--foreground)_35%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-[toast-rise_280ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <span
            aria-hidden
            className={
              toast.tone === "success"
                ? "inline-flex size-4 items-center justify-center rounded-full bg-[color:var(--chart-4)] text-[10px] font-semibold text-foreground"
                : "inline-flex size-4 items-center justify-center rounded-full bg-foreground/20 text-[10px] font-semibold text-foreground"
            }
          >
            ✓
          </span>
          <span className="text-foreground">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export function toast(message: string, tone: Toast["tone"] = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("app:toast", { detail: { message, tone } }),
  );
}
