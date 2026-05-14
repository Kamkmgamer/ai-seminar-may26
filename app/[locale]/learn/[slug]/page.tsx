import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { LessonChecklist } from "@/components/lesson-checklist";
import { LessonCompletion } from "@/components/lesson-completion";
import { LessonFooterNav } from "@/components/lesson-footer-nav";
import { LessonPathRail } from "@/components/lesson-path-rail";
import { LessonPrep } from "@/components/lesson-prep";
import {
  getChapterLabel,
  getLesson,
  getLessonPosition,
  getNextReadyLesson,
  getPreviousReadyLesson,
  isLocale,
  readyLessons,
  type Locale,
} from "@/lib/course";
import { getLessonChecklist } from "@/lib/lesson-checklists";
import { loadLessonHeadings } from "@/lib/lesson-headings";
import { loadLesson } from "@/lib/lesson-modules";
import { getLessonPrerequisites } from "@/lib/lesson-prep";

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    readyLessons.map((lesson) => ({ locale, slug: lesson.slug })),
  );
}

export const dynamicParams = false;

const lessonCopy = {
  en: {
    chapter: (n: number, total: number) =>
      `Chapter ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    minutes: (m: number) => `${m} min read`,
  },
  ar: {
    chapter: (n: number, total: number) =>
      `الفصل ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    minutes: (m: number) => `${m} دقيقة قراءة`,
  },
} satisfies Record<Locale, Record<string, unknown>>;

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const lesson = getLesson(slug);
  const lessonModule = await loadLesson(locale, slug);

  if (!lesson || !lessonModule) {
    notFound();
  }

  const LessonContent = lessonModule.default;
  const nextLesson = getNextReadyLesson(slug);
  const previousLesson = getPreviousReadyLesson(slug);
  const { index, total } = getLessonPosition(slug);
  const headings = await loadLessonHeadings(locale, slug);
  const text = lessonCopy[locale];
  const chapter = getChapterLabel(slug, locale);
  const checklist = getLessonChecklist(slug);
  const prerequisites = getLessonPrerequisites(slug, locale);

  return (
    <CourseShell locale={locale} activeSlug={slug}>
      <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-x-16 xl:grid-cols-[13rem_minmax(0,1fr)_18rem]">
        <LessonPathRail
          locale={locale}
          activeSlug={slug}
          headings={headings}
        />

        <article className="min-w-0">
          <header className="agent-step relative flex flex-col gap-5 border-b border-dashed border-foreground/20 pb-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              <span className="font-mono tabular-nums">
                {text.chapter(index + 1, total)}
              </span>
              {chapter ? (
                <>
                  <span aria-hidden className="opacity-40">
                    ·
                  </span>
                  <span>{chapter}</span>
                </>
              ) : null}
            </div>
            <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              {lesson.title[locale]}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {lesson.summary[locale]}
            </p>
            <div className="mt-2 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>{text.minutes(lesson.minutes)}</span>
              <span aria-hidden className="h-px w-6 bg-foreground/20" />
              <span className="tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </header>

          <div className="pt-8">
            <LessonPrep
              locale={locale}
              goal={lesson.summary[locale]}
              prerequisites={prerequisites}
            />
          </div>

          <div className="mdx-body max-w-3xl pt-10">
            <LessonContent />
          </div>

          <div className="xl:hidden">
            <LessonChecklist locale={locale} lessonSlug={slug} items={checklist} />
          </div>

          <div className="xl:hidden">
            <LessonCompletion locale={locale} slug={slug} />
          </div>

          <LessonFooterNav
            locale={locale}
            previous={previousLesson}
            next={nextLesson}
          />
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-32 flex flex-col gap-5">
            <LessonChecklist locale={locale} lessonSlug={slug} items={checklist} />
            <LessonCompletion locale={locale} slug={slug} />
          </div>
        </aside>
      </div>
    </CourseShell>
  );
}
