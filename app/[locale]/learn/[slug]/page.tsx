import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseShell } from "@/components/course-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getLesson,
  getNextReadyLesson,
  isLocale,
  readyLessons,
} from "@/lib/course";
import { loadLesson } from "@/lib/lesson-modules";

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    readyLessons.map((lesson) => ({ locale, slug: lesson.slug }))
  );
}

export const dynamicParams = false;

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

  return (
    <CourseShell locale={locale} activeSlug={slug}>
      <article className="py-8 md:py-14">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{lesson.minutes} min</Badge>
        <Badge variant="outline">{lesson.status}</Badge>
      </div>
      <div className="max-w-3xl">
        <LessonContent />
      </div>

      <Separator className="my-10 max-w-3xl" />

      <div className="flex max-w-3xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            This placeholder shell will later save checklist completion for signed-in students.
          </p>
          {nextLesson ? (
            <Button render={<Link href={`/${locale}/learn/${nextLesson.slug}`} />}>
              Next lesson
            </Button>
          ) : (
            <Button render={<Link href={`/${locale}`} />} variant="outline">
              Back to course
            </Button>
          )}
      </div>
      </article>
    </CourseShell>
  );
}
