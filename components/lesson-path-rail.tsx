"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getChapterLabel,
  readyLessons,
  type Locale,
} from "@/lib/course";

type LessonPathRailProps = {
  locale: Locale;
  activeSlug: string;
  headings: { id: string; text: string }[];
};

const railCopy = {
  en: {
    pathLabel: "Workshop path",
    onThisPage: "On this page",
    showAll: "All lessons",
    hide: "Hide",
  },
  ar: {
    pathLabel: "مسار الورشة",
    onThisPage: "في هذا الدرس",
    showAll: "كل الدروس",
    hide: "إخفاء",
  },
} satisfies Record<Locale, Record<string, string>>;

export function LessonPathRail({
  locale,
  activeSlug,
  headings,
}: LessonPathRailProps) {
  const text = railCopy[locale];
  const [activeHeading, setActiveHeading] = useState<string | undefined>(
    headings[0]?.id,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveHeading(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings]);

  const list = (
    <ol className="flex flex-col">
      {readyLessons.map((lesson, i) => {
        const isActive = lesson.slug === activeSlug;
        const chapter = getChapterLabel(lesson.slug, locale);
        return (
          <li key={lesson.slug}>
            <Link
              href={`/${locale}/learn/${lesson.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={
                "group grid grid-cols-[2rem_1fr] items-baseline gap-x-3 border-t border-dashed border-foreground/15 py-3 first:border-t-0 first:pt-0 " +
                (isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              <span
                className={
                  "font-mono text-[11px] tabular-nums " +
                  (isActive ? "text-[color:var(--chart-4)]" : "text-muted-foreground/70")
                }
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="relative inline-block max-w-full">
                  <span
                    className={
                      "block truncate text-sm leading-snug " +
                      (isActive ? "font-semibold" : "font-medium")
                    }
                  >
                    {lesson.title[locale]}
                  </span>
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[color:var(--chart-4)]"
                    />
                  ) : null}
                </div>
                {chapter ? (
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {chapter} · {lesson.minutes} min
                  </span>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  const tocBlock =
    headings.length > 0 ? (
      <div className="mt-8 border-t border-dashed border-foreground/15 pt-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {text.onThisPage}
        </div>
        <ol className="mt-3 flex flex-col gap-2">
          {headings.map((h) => {
            const active = h.id === activeHeading;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={
                    "block border-s text-sm leading-snug transition-colors ps-3 " +
                    (active
                      ? "border-[color:var(--chart-4)] text-foreground font-medium"
                      : "border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/40")
                  }
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    ) : null;

  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-32">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {text.pathLabel}
          </div>
          <div className="mt-4">{list}</div>
          {tocBlock}
        </div>
      </aside>

      {/* Mobile / tablet inline trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 border-y border-dashed border-foreground/20 py-3 text-start"
        >
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {text.pathLabel}
          </span>
          <span className="text-xs text-muted-foreground">
            {mobileOpen ? text.hide : text.showAll} {mobileOpen ? "−" : "+"}
          </span>
        </button>
        {mobileOpen ? <div className="py-4">{list}</div> : null}
        {tocBlock}
      </div>
    </>
  );
}
