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
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/76">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <Link href={`/${locale}`} className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {text.eyebrow}
            </span>
            <span className="text-2xl font-semibold tracking-tight">{text.brand}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher locale={locale} slug={activeSlug} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <div className="mb-10 max-w-3xl">
          <Progress value={completion}>
            <ProgressLabel>{text.progress}</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        {children}
      </main>
    </div>
  );
}
