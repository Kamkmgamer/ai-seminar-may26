"use client";

import { useState, type ReactNode } from "react";

import { toast } from "@/components/toaster";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function detectLocale(): "en" | "ar" {
  if (typeof document === "undefined") return "en";
  const root = document.documentElement.getAttribute("lang");
  if (root === "ar") return "ar";
  const node = document.querySelector("[lang='ar']");
  return node ? "ar" : "en";
}

const labels = {
  en: { copy: "Copy", copied: "Copied", toastOk: "Copied to clipboard", toastFail: "Couldn't copy" },
  ar: { copy: "نسخ", copied: "تم", toastOk: "تم نسخ الكود", toastFail: "ما قدرنا ننسخ" },
} as const;

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const locale = detectLocale();
    const text = extractText(children).replace(/\n$/, "");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast(labels[locale].toastOk, "success");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast(labels[locale].toastFail, "info");
    }
  }

  const t = labels.en;

  return (
    <div className="group relative mt-6">
      <pre
        dir="ltr"
        className="overflow-x-auto rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 pr-16 font-mono text-[0.875rem] leading-7 text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_6%,transparent)] dark:bg-foreground/[0.05]"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t.copied : t.copy}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-foreground/10 bg-background/80 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur transition-all duration-150 hover:border-foreground/25 hover:text-foreground focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <span
          aria-hidden
          className={
            copied
              ? "inline-flex size-3 items-center justify-center rounded-full bg-[color:var(--chart-4)] text-[9px] text-foreground"
              : "inline-flex size-3 items-center justify-center text-foreground/60"
          }
        >
          {copied ? "✓" : "⧉"}
        </span>
        {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}
