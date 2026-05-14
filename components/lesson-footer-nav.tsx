import Link from "next/link";

import {
  getChapterLabel,
  readyLessons,
  type Lesson,
  type Locale,
} from "@/lib/course";

type LessonFooterNavProps = {
  locale: Locale;
  previous?: Lesson;
  next?: Lesson;
};

const footerCopy = {
  en: {
    previous: "Previous",
    next: "Next",
    backToCourse: "Back to the field guide",
    finished: "You finished the path.",
  },
  ar: {
    previous: "السابق",
    next: "التالي",
    backToCourse: "ارجع إلى الدليل الميداني",
    finished: "ختمت كل الدروس.",
  },
} satisfies Record<Locale, Record<string, string>>;

function indexOf(slug: string) {
  return readyLessons.findIndex((l) => l.slug === slug);
}

function Tile({
  lesson,
  locale,
  direction,
  label,
}: {
  lesson: Lesson;
  locale: Locale;
  direction: "previous" | "next";
  label: string;
}) {
  const i = indexOf(lesson.slug);
  const chapter = getChapterLabel(lesson.slug, locale);
  const isRtl = locale === "ar";
  const arrow =
    direction === "next" ? (isRtl ? "←" : "→") : isRtl ? "→" : "←";
  return (
    <Link
      href={`/${locale}/learn/${lesson.slug}`}
      className={
        "group relative flex flex-col gap-3 py-7 transition-colors " +
        (direction === "next"
          ? "items-end text-end"
          : "items-start text-start")
      }
    >
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {direction === "previous" ? (
          <>
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
            >
              {arrow}
            </span>
            {label}
          </>
        ) : (
          <>
            {label}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              {arrow}
            </span>
          </>
        )}
      </span>
      <span className="font-mono text-2xl tabular-nums text-muted-foreground/70">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-[color:var(--chart-4)]">
        {lesson.title[locale]}
      </span>
      <span className="max-w-xs text-sm leading-6 text-muted-foreground">
        {lesson.summary[locale]}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
        {chapter ? `${chapter} · ` : ""}
        {lesson.minutes} min
      </span>
    </Link>
  );
}

export function LessonFooterNav({
  locale,
  previous,
  next,
}: LessonFooterNavProps) {
  const text = footerCopy[locale];
  const isRtl = locale === "ar";
  const prevArrow = isRtl ? "→" : "←";
  const nextArrow = isRtl ? "←" : "→";

  return (
    <footer className="mt-20 border-t border-dashed border-foreground/20 pt-6">
      <div className="grid md:grid-cols-2 md:divide-x md:divide-dashed md:divide-foreground/15 md:rtl:divide-x-reverse">
        <div className="md:pe-8">
          {previous ? (
            <Tile
              lesson={previous}
              locale={locale}
              direction="previous"
              label={text.previous}
            />
          ) : (
            <Link
              href={`/${locale}`}
              className="group flex flex-col items-start gap-2 py-7 text-start"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {prevArrow} {text.previous}
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-[color:var(--chart-4)]">
                {text.backToCourse}
              </span>
            </Link>
          )}
        </div>
        <div className="md:ps-8">
          {next ? (
            <Tile
              lesson={next}
              locale={locale}
              direction="next"
              label={text.next}
            />
          ) : (
            <div className="flex flex-col items-end gap-2 py-7 text-end">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {text.next} {nextArrow}
              </span>
              <Link
                href={`/${locale}`}
                className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-[color:var(--chart-4)]"
              >
                {text.backToCourse}
              </Link>
              <span className="text-sm text-muted-foreground">
                {text.finished}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
