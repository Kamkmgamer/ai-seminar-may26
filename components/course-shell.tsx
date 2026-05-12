import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { lessons, readyLessons, type Locale } from "@/lib/course";

type CourseShellProps = {
  locale: Locale;
  activeSlug?: string;
  children: React.ReactNode;
};

const copy = {
  en: {
    brand: "AI in 2026",
    eyebrow: "Student field guide",
    progress: "Learning map preview",
  },
  ar: {
    brand: "الذكاء الاصطناعي في 2026",
    eyebrow: "دليل عملي للطلاب",
    progress: "معاينة خريطة التعلم",
  },
} satisfies Record<Locale, Record<string, string>>;

export function CourseShell({ locale, activeSlug, children }: CourseShellProps) {
  const text = copy[locale];
  const completion = Math.round((readyLessons.length / lessons.length) * 100);

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-10 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75 dark:bg-background/90 dark:supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href={`/${locale}`} className="group flex items-baseline gap-3">
            <span className="text-lg font-semibold tracking-tight">{text.brand}</span>
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:inline">
              · {text.eyebrow}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} slug={activeSlug} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-14 max-w-md">
          <Progress value={completion}>
            <ProgressLabel className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {text.progress}
            </ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        {children}
      </main>
    </div>
  );
}
