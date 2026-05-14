import Link from "next/link";

import { AuthMenu } from "@/components/auth-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  getChapterLabel,
  getLessonPosition,
  lessons,
  readyLessons,
  type Locale,
} from "@/lib/course";

type CourseShellProps = {
  locale: Locale;
  activeSlug?: string;
  variant?: "default" | "landing";
  children: React.ReactNode;
};

const copy = {
  en: {
    brand: "AI in 2026",
    eyebrow: "Student field guide",
    progress: "Learning map preview",
    agents: "Agents",
    references: "References",
    leaderboard: "Leaderboard",
    lessonOf: (n: number, total: number) =>
      `Lesson ${String(n).padStart(2, "0")} of ${String(total).padStart(2, "0")}`,
  },
  ar: {
    brand: "الذكاء الاصطناعي في 2026",
    eyebrow: "دليل عملي للطلاب",
    progress: "معاينة خريطة التعلم",
    agents: "الوكلاء",
    references: "المراجع",
    leaderboard: "الترتيب",
    lessonOf: (n: number, total: number) =>
      `الدرس ${String(n).padStart(2, "0")} من ${String(total).padStart(2, "0")}`,
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function CourseShell({
  locale,
  activeSlug,
  variant = "default",
  children,
}: CourseShellProps) {
  const text = copy[locale];
  const lessonMode = Boolean(activeSlug);
  const landingMode = variant === "landing";

  return (
    <div className="site-shell min-h-screen text-foreground">
      <header
        className={
          landingMode
            ? "site-header sticky top-0 z-20"
            : "site-header sticky top-0 z-20"
        }
      >
        <div
          className={
            landingMode
              ? "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
              : "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
          }
        >
          <Link href={`/${locale}`} className="group flex items-baseline gap-3">
            <span className="text-sm font-semibold tracking-tight text-[color:var(--site-strong)]">
              {text.brand}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[color:var(--site-muted)] md:inline">
              · {text.eyebrow}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/agents`}
              className={
                landingMode
                  ? "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] md:inline-flex"
                  : "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] md:inline-flex"
              }
            >
              {text.agents}
            </Link>
            <Link
              href={`/${locale}/references`}
              className={
                landingMode
                  ? "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] lg:inline-flex"
                  : "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] lg:inline-flex"
              }
            >
              {text.references}
            </Link>
            <Link
              href={`/${locale}/leaderboard`}
              className={
                landingMode
                  ? "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] xl:inline-flex"
                  : "hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-hover)] hover:text-[color:var(--site-strong)] xl:inline-flex"
              }
            >
              {text.leaderboard}
            </Link>
            <AuthMenu locale={locale} />
            <LanguageSwitcher locale={locale} slug={activeSlug} />
            <ThemeToggle />
          </div>
        </div>
        {lessonMode && activeSlug ? (
          <LessonProgressStrip locale={locale} activeSlug={activeSlug} />
        ) : null}
      </header>

      <main
        className={
          landingMode
            ? "site-main w-full"
            : "site-main mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 md:pt-12"
        }
      >
        {!lessonMode && !landingMode ? (
          <div className="mb-14 max-w-md">
            <Progress value={Math.round((readyLessons.length / lessons.length) * 100)}>
              <ProgressLabel className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {text.progress}
              </ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}

function LessonProgressStrip({
  locale,
  activeSlug,
}: {
  locale: Locale;
  activeSlug: string;
}) {
  const { index, total } = getLessonPosition(activeSlug);
  if (index === -1) return null;

  const text = copy[locale];
  const chapter = getChapterLabel(activeSlug, locale);
  const current = index + 1;

  return (
    <div className="border-t border-dashed border-foreground/15">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="font-mono tabular-nums">{text.lessonOf(current, total)}</span>
        {chapter ? (
          <>
            <span aria-hidden className="h-px w-6 bg-foreground/20" />
            <span className="text-foreground/70">{chapter}</span>
          </>
        ) : null}
        <ol
          aria-hidden
          className="ms-auto flex items-center gap-1"
        >
          {readyLessons.map((lesson, i) => {
            const state =
              i < index ? "done" : i === index ? "current" : "upcoming";
            return (
              <li
                key={lesson.slug}
                className={
                  state === "done"
                    ? "h-[3px] w-5 rounded-full bg-foreground/55"
                    : state === "current"
                      ? "h-[3px] w-8 rounded-full bg-[color:var(--chart-4)]"
                      : "h-[3px] w-5 rounded-full bg-foreground/15"
                }
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}
