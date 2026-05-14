"use client";

import { useEffect, useState, type ReactNode } from "react";

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

function extractLanguage(node: ReactNode): string {
  if (Array.isArray(node)) {
    return node.map(extractLanguage).find(Boolean) ?? "";
  }
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props: { className?: string; children?: ReactNode } }).props;
    if (typeof props.className === "string") {
      return props.className.replace(/^language-/, "");
    }
    return extractLanguage(props.children);
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
  en: {
    copy: "Copy",
    copied: "Copied",
    prompt: "Prompt",
    powershell: "Windows PowerShell",
    review: "Review before running",
    toastOk: "Copied to clipboard",
    toastFail: "Couldn't copy",
  },
  ar: {
    copy: "نسخ",
    copied: "تم",
    prompt: "Prompt",
    powershell: "Windows PowerShell",
    review: "راجع قبل التشغيل",
    toastOk: "تم نسخ الكود",
    toastFail: "ما قدرنا ننسخ",
  },
} as const;

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const language = extractLanguage(children);

  useEffect(() => {
    const id = window.setTimeout(() => setLocale(detectLocale()), 0);
    return () => window.clearTimeout(id);
  }, []);

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

  const t = labels[locale];
  const blockLabel = language === "powershell" ? t.powershell : t.prompt;

  return (
    <div className="group relative mt-6">
      <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>{blockLabel}</span>
        {language === "powershell" ? (
          <span className="rounded-full border border-dashed px-2 py-0.5 text-[color:var(--chart-4)]">
            {t.review}
          </span>
        ) : null}
      </div>
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
